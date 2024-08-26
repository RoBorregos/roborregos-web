// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";
import HomeSingleSponsor from "./HomeSingleSponsor/HomeSingleSponsor";
import "./HomeSponsors.css";

type SponsorType = {
  name: string,
  img_path: string,
  link: string,
};

type Props = {
  sponsors: Array<SponsorType>,
};

const HomeSponsors = (props: Props) => {
  const { sponsors } = props;
  const sponsorLarge = sponsors.filter((sponsor) => sponsor.size === "L")
  const sponsorMedium = sponsors.filter((sponsor) => sponsor.size === "M")

  return (
    <div className="home-sponsors-container">
      <Row className="justify-content-sm-center">
        <Col sm="10">
          <Row className="justify-content-sm-center center-items">
            {sponsorLarge.map((sponsor: SponsorType, index: number) => (
              <Col
                sm="12"
                md="6"
                lg="4"
                key={index}
                test-id={index}
                className="sponsor-col"
              >
                <HomeSingleSponsor sponsor={sponsor} large={true}/>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-sm-center align-content-center">
            {sponsorMedium.map((sponsor: SponsorType, index: number) => (
              <Col
                sm="12"
                md="6"
                lg="4"
                key={index}
                test-id={index}
                className="sponsor-col"
              >
                <HomeSingleSponsor sponsor={sponsor} large={false}/>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeSponsors;
