import React from "react";
import placeholder from "../../../../images/placeholder-rectangle.png";
import "./HomeSingleSponsor.css";

type SponsorType = {
  name: string,
  img_path: string,
  link: string,
};

type Props = {
  sponsor: SponsorType,
};

const HomeSingleSponsor = (props: Props) => {
  const tryRequire = (img_path: string) => {
    try {
      return require(`../../../../images/sponsors/${img_path}`);
    } catch (err) {
      return placeholder;
    }
  };
  const { sponsor } = props;

  return (
    <a
      test-id="a1"
      href={sponsor.link}
      className="single-sponsor"
      target="_blank"
      rel="noreferrer noopener"
    >
      {props.large ? (
        <img
          className="sponsor-image-lg"
          src={tryRequire(sponsor.img_path)}
          alt={sponsor.name}
        />
      ) : (
        <img
          className="sponsor-image-md"
          src={tryRequire(sponsor.img_path)}
          alt={sponsor.name}
        />
      )}

      {/* <img
        className="sponsor-image"
        src=""
        style={{
          backgroundImage: `url(${tryRequire(sponsor.img_path)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px", // or specify a fixed height if needed
          width: "auto", // or specify a fixed width if needed
        }}
        aria-label={sponsor.name}
      /> */}
      <div className="img-filter" />
    </a>
  );
};

export default HomeSingleSponsor;
