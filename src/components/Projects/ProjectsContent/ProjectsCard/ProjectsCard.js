// @flow
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Container } from 'react-bootstrap'
import logo from '../../../../images/info_background_3.jpg'
import './ProjectsCard.css'

type Props = {};

/** Component class of Projects' card. */
class ProjectsCard extends Component<Props> {
  /**
   * Class constructor
   * @param {list} props: List of projects data.
   */
  constructor(props: Props) {
    super(props)
    this.cardContent = this.cardContent.bind(this)
    this.imageContent = this.imageContent.bind(this)
    // this.joinUsCallback = this.joinUsCallback(this)

    this.project = props.project
    this.index = props.index
  }

  joinUsCallback = (link) => {
    window.open(link)
  }

  cardContent(size) {
    return (
      <Col lg={size} className="card-info">
        <h2 className="title-text-card">
          {this.project.title}
        </h2>
        <div className="main-text-projects">
          <p>
            {this.project.description}
          </p>
        </div>
        <button type="button" className="card-button" onClick={() => this.joinUsCallback(this.project.wiki)} variant="outline-primary">
          {(this.project.wiki !== '') ? 'Learn more' : 'Coming soon'}
        </button>
      </Col>
    )
  }

  imageContent(size) {
    return (
      <Col lg={size}>
        <img src={this.project.image} className="card-image" alt={this.project.title} />
      </Col>
    )
  }

  /**
 * Renders Responsive view of Projects's card.
 * @return {renderized_component} Heder banner with legend.
 */
  render() {
    if (this.index % 2) {
      return (
        <Row className="projects-card">
          {this.cardContent(7)}
          {this.imageContent(5)}
        </Row>
      )
    }
    return (
      <Row className="projects-card">
        {this.imageContent(5)}
        {this.cardContent(7)}
      </Row>
    )
  }
}

export default ProjectsCard