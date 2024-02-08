import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-material-ui-carousel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCode,
  faBullhorn,
  faMicrochip,
  faRocket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import membersData from "../../../data/members.json";
import placeholder from "../../../images/placeholder-rectangle.png";
import { LARGE_WIDTH, MEDIUM_WIDTH, MOBILE_WIDTH } from "../../../constants";
import MemberModal from "./MemberModal/MemberModal";
import { useLocation } from "react-router-dom";
import "./MembersGrid.css";

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

const numberOfGridCols = () => {
  if (window.innerWidth >= LARGE_WIDTH) {
    return 5;
  }
  if (window.innerWidth >= MEDIUM_WIDTH) {
    return 4;
  }
  if (window.innerWidth >= MOBILE_WIDTH) {
    return 3;
  }
  return 2;
};

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../images/members/${imgPath}`);
  } catch (err) {
    return placeholder;
  }
};

function MembersGrid() {
  const [showModal, setShowModal] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [memberIndex, _setMemberIndex] = useState(0);
  const [active, setActive] = useState(true);
  const [gridCols, setGridCols] = useState(numberOfGridCols());

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
    const updateGridCols = () => {
      setGridCols(numberOfGridCols());
    };

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

    window.addEventListener("resize", updateGridCols);
    document.addEventListener("keydown", keyListener, false);

    return () => {
      window.removeEventListener("resize", updateGridCols);
      document.removeEventListener("keydown", keyListener);
    };
  }, [memberList]);

  const memberIcon = (role: string) => {
    if (role === "Software Development") {
      return faCode;
    }
    if (role === "Electronics") {
      return faMicrochip;
    }
    if (role === "Mechanical Design") {
      return faCog;
    }
    if (role === "Logistics & Sponsorship") {
      return faBullhorn;
    }
    return faRocket;
  };

  const renderGridList = (members: Array<Member>, title: string) => (
    <div>
      <div
        style={{ display: title === "" ? "none" : "block" }}
        className="grid-title"
      >
        <h1 className="grid-title-text">{title}</h1>
      </div>
      <GridList
        cellHeight="auto"
        className="members-grid"
        cols={gridCols}
        spacing={3}
      >
        {members.map((member, index) => (
          <GridListTile
            key={member.id}
            cols={1}
            id={`members-grid-tile-${member.id}`}
            className="members-grid-tile"
            onClick={() => {
              setShowModal(true);
              setMemberIndex(index);
              setActive(member.status !== "inactive");
            }}
          >
            <div className="member-image-container">
              <img
                className="member-image"
                src={tryRequire(`${member.id}.jpg`)}
                alt={member.name}
              />
              <div className="member-image-content">
                <p>{`${member.name} ${member.lastname}`}</p>
                <div className="member-image-icon">
                  <FontAwesomeIcon
                    icon={memberIcon(member.role)}
                    size="1x"
                    color="#ccc"
                  />
                </div>
              </div>
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

  return (
    <div
      className="members-grid-container"
      data-testid="members-grid-container"
    >
      <div className="members-grid-search-bar">
        <FontAwesomeIcon icon={faSearch} className="members-search-bar-icon" />
        <input
          type="text"
          className="members-grid-search-bar-input"
          placeholder='Try  "mechanic",  "software",  "Aurora"'
          onChange={(e) => setSearchBarText(e.target.value)}
          value={searchBarText}
        />
      </div>
      {searchBarText === ""
        ? [
            renderGridList(activeMembers, ""),
            renderGridList(inactiveMembers, "RoBorregos Legacy"),
          ]
        : renderGridList(filteredMembers, "")}
      <Modal
        className="modal-container"
        data-testid="modal-container"
        show={showModal}
        dialogAs={() => (
          <Carousel
            navButtonsAlwaysVisible
            autoPlay={false}
            timeout={200}
            fullHeightHover={false}
            indicators={false}
            onChange={(next) => setMemberIndex(next)}
            index={memberIndex}
            startAt={memberIndex}
          >
            {memberList.map((member) => (
              <MemberModal
                member={member}
                onHide={() => setShowModal(false)}
                key={member.id}
              />
            ))}
          </Carousel>
        )}
      />
    </div>
  );
}

export default MembersGrid;
