// @flow
import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Row, Col } from "react-bootstrap";
import { MEDIUM_WIDTH } from "../../constants";
import logo from "../../images/small_logo.png";
import "./Footer.css";

const sitemaps = [
  {
    link: "/",
    text: "Home",
  },
  {
    link: "/about",
    text: "About",
  },
  {
    link: "/projects",
    text: "Projects",
  },
  {
    link: "/members",
    text: "Members",
  },
  {
    link: "/candidates",
    text: "Candidates",
  },
  {
    link: "/support-us",
    text: "Support Us",
  },
];

const socialMediaIcons = [
  {
    link: "https://www.facebook.com/RoBorregos/",
    icon: FacebookIcon,
  },
  {
    link: "https://www.instagram.com/roborregos/",
    icon: InstagramIcon,
  },
  {
    link: "https://www.youtube.com/channel/UCeSvAh96bXA3CcRGc4u7_oA",
    icon: YouTubeIcon,
  },
  {
    link: "https://github.com/RoBorregos/",
    icon: GitHubIcon,
  },
  {
    link: "https://mx.linkedin.com/company/roborregos",
    icon: LinkedInIcon,
  },
];

const SocialMediaIcons = () => (
  <div className="row-socialMedia">
    {socialMediaIcons.map((site) => (
      <a
        className="icon-link"
        href={site.link}
        target="_blank"
        rel="noreferrer"
      >
        <site.icon style={{ fontSize: 40 }} />
      </a>
    ))}
  </div>
);

const GoBackButton = () => (
  <div className="goback-button">
    <IconButton
      component="a"
      onClick={() => window.scrollTo(0, 0)}
      color="inherit"
      className="sitemap-link"
      style={{ padding: 0 }}
    >
      <ExpandLessIcon />
      <div className="goback-text">Back to top</div>
    </IconButton>
  </div>
);

const MarkText = () => <div className="mark-text">@2026 RoBorregos</div>;

const Footer = () => {
  const [isViewLarge, setIsViewLarge] = useState(
    window.innerWidth > MEDIUM_WIDTH
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsViewLarge(window.innerWidth > MEDIUM_WIDTH);
    });
  }, []);

  const renderSitemaps = () =>
    sitemaps.map((sitemap) => (
      <a href={sitemap.link} className="sitemap-link">
        {sitemap.text}
      </a>
    ));

  return (
    <Row className="footer-row">
      <Col lg={4} xs={6} className="col-logo">
        <img src={logo} className="footer-logo" alt="logo" />
      </Col>
      {isViewLarge ? (
        <>
          <Col lg={5} className="sitemap-container">
            {renderSitemaps()}
          </Col>
          <Col lg={3} className="left-panel">
            <GoBackButton />
            <div>
              <Row>
                <SocialMediaIcons />
              </Row>
              <Row style={{ justifyContent: "flex-end" }}>
                <MarkText />
              </Row>
            </div>
          </Col>
        </>
      ) : (
        <Col lg={4} xs={6} className="left-panel">
          <GoBackButton />
          <div className="sitemap-container">{renderSitemaps()}</div>
          <MarkText />
          <SocialMediaIcons />
        </Col>
      )}
    </Row>
  );
};

export default Footer;
