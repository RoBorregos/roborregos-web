import React, { useEffect, useState, useRef } from "react";
import membersData from "../../../data/members.json";
import placeholder from "../../../images/placeholder-rectangle.png";
import MemberModal from "./MemberModal/MemberModal";

type Member = {
  id: number,
  name: string,
  lastname: string,
  github: string,
  github_user: string,
  linkedin: string,
  resume_link: string,
  description: string,
  class: string,
  semesters: string,
  subtitle: string,
  status: string,
  role: string,
};

const inactiveMembers = membersData.members.filter(
  (member) => member.status === "inactive"
);
const activeMembers = membersData.members.filter(
  (member) => member.status === "active" || member.status === "comitee"
);

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../images/members/${imgPath}`);
  } catch (err) {
    return placeholder;
  }
};

const updateNameQueryParam = (name: string, lastname: string) => {
  const currentUrl = window.location.href;

  const newQueryParam = `name=${name}%20${lastname}`;
  let updatedUrl;
  const questionMark = currentUrl.indexOf("?");
  if (questionMark !== -1) {
    updatedUrl = currentUrl.substring(0, questionMark) + "?" + newQueryParam;
  } else {
    updatedUrl = currentUrl + "?" + newQueryParam;
  }

  window.history.pushState({ path: updatedUrl }, "", updatedUrl);
};

function MembersGrid() {
  const [showModal, setShowModal] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [memberIndex, _setMemberIndex] = useState(0);
  const [active, setActive] = useState(true);

  const queryParams = new URLSearchParams(location.search);

  const param1 = queryParams.get("name");

  const [searchBarText, setSearchBarText] = useState(param1 ?? "");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const extendKeywordSearch = (
    keywords: Array<string>,
    index: number,
    field: string
  ) => {
    let i = index;
    if (i + 1 < keywords.length) {
      let j = i + 1;
      let substr = `${keywords[i]} ${keywords[j]}`;
      while (j < keywords.length && field.toLowerCase().startsWith(substr)) {
        substr += ` ${keywords[j]}`;
        j += 1;
      }
      i = j - 1;
    }
    return i;
  };

  useEffect(() => {
    const keywords = searchBarText.toLowerCase().split(" ");
    setFilteredMembers(
      membersData.members.filter((member) => {
        let name = true;
        let lastname = true;
        let role = true;
        for (let i = 0; i < keywords.length; i += 1) {
          if (name && member.name.toLowerCase().startsWith(keywords[i])) {
            i = extendKeywordSearch(keywords, i, member.name);
            name = false;
          } else if (
            lastname &&
            member.lastname.toLowerCase().startsWith(keywords[i])
          ) {
            i = extendKeywordSearch(keywords, i, member.lastname);
            lastname = false;
          } else if (
            role &&
            member.role.toLowerCase().startsWith(keywords[i])
          ) {
            i = extendKeywordSearch(keywords, i, member.role);
            role = false;
          } else {
            const tags = member.tags.toLowerCase().split(", ");
            let matchTag = false;
            let k = i;
            for (let j = 0; j < tags.length; j += 1) {
              if (tags[j].startsWith(keywords[i])) {
                k = Math.max(extendKeywordSearch(keywords, i, tags[j]), k);
                matchTag = true;
              }
            }
            i = k;
            if (!matchTag) {
              return false;
            }
          }
        }
        return true;
      })
    );
  }, [searchBarText]);

  const memberIndexRef = useRef(memberIndex);

  const setMemberIndex = (index) => {
    memberIndexRef.current = index;
    _setMemberIndex(index);
  };

  const memberList = (() => {
    if (searchBarText !== "") {
      return filteredMembers;
    }
    return active ? activeMembers : inactiveMembers;
  })();

  useEffect(() => {
    if (param1 && filteredMembers.length > 0 && !firstLoad) {
      setShowModal(true);
      setMemberIndex(filteredMembers[0].index);
      setActive(filteredMembers[0].status !== "inactive");
      setFirstLoad(true);
    }
  }, [param1, filteredMembers]);

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        setShowModal(false);
      }
      if (event.keyCode === 37) {
        if (memberIndexRef.current === 0) {
          setMemberIndex(memberList.length - 1);
        } else {
          setMemberIndex(memberIndexRef.current - 1);
        }
      } else if (event.keyCode === 39) {
        setMemberIndex((memberIndexRef.current + 1) % memberList.length);
      }
    };

    document.addEventListener("keydown", keyListener, false);

    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  }, [memberList]);

  const memberIcon = (role: string) => {
    if (role === "Software Development") return "fa-code";
    if (role === "Electronics") return "fa-microchip";
    if (role === "Mechanical Design") return "fa-cog";
    if (role === "Logistics & Sponsorship") return "fa-bullhorn";
    return "fa-rocket";
  };

  const renderGridList = (members: Array<Member>, title: string) => (
    <div key={title || "main"}>
      {title !== "" && (
        <h2 className="section-title mb-8 mt-16 text-center">{title}</h2>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {members.map((member, index) => (
          <button
            type="button"
            key={member.id}
            id={`members-grid-tile-${member.id}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-card text-left"
            onClick={() => {
              setShowModal(true);
              setMemberIndex(index);
              setActive(member.status !== "inactive");
              if (!firstLoad) setFirstLoad(true);
              updateNameQueryParam(member.name, member.lastname);
            }}
          >
            <img
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              src={tryRequire(`${member.id}.jpg`)}
              alt={member.name}
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black to-transparent p-3 pt-10">
              <p className="text-sm font-semibold">{`${member.name} ${member.lastname}`}</p>
              <i className={`fas ${memberIcon(member.role)} text-gray-300 group-hover:text-bright`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section className="px-6 py-16" data-testid="members-grid-container">
      <div className="mx-auto max-w-6xl">
        <div className="relative mx-auto mb-12 max-w-xl">
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full rounded-full bg-[#545454] py-3 pl-12 pr-5 text-gray-100 placeholder-gray-400 outline-none ring-roboblue transition focus:ring-2"
            placeholder='Try  "mechanic",  "software",  "Aurora"'
            onChange={(e) => {
              setSearchBarText(e.target.value);
              if (!firstLoad) setFirstLoad(true);
            }}
            value={searchBarText}
          />
        </div>
        {searchBarText === ""
          ? [
              renderGridList(activeMembers, ""),
              renderGridList(inactiveMembers, "RoBorregos Legacy"),
            ]
          : renderGridList(filteredMembers, "")}
      </div>
      {showModal && memberList[memberIndex] && (
        <MemberModal
          member={memberList[memberIndex]}
          onHide={() => setShowModal(false)}
          onPrev={() => {
            const next = (memberIndex - 1 + memberList.length) % memberList.length;
            setMemberIndex(next);
            updateNameQueryParam(memberList[next].name, memberList[next].lastname);
          }}
          onNext={() => {
            const next = (memberIndex + 1) % memberList.length;
            setMemberIndex(next);
            updateNameQueryParam(memberList[next].name, memberList[next].lastname);
          }}
        />
      )}
    </section>
  );
}

export default MembersGrid;
