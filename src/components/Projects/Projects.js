// @flow
import React, { Component } from 'react'
import ProjectsContent from './ProjectsContent/ProjectsContent'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'

type Project = {
  title: string,
  description: string,
  image: string,
  wiki: string
};

type OtherProjects = {
  title: string,
  image: string,
  wiki: string,
  background: string,
  color: string
};

type ProjectsData = {
  main: Array<Project>,
  carrousel: Array<Array<Project>>,
  other: Array<OtherProjects>
};

type Props = {
  projectsData: ProjectsData
};

/** Component class of Projects page. */
export class Projects extends Component <Props> {
    projects: ProjectsData;

    headerTitle = 'Projects'

    headerMainText = ['Every year we challenge ourselves to keep learning and improving.', "See what we've been up to!"]

    headerSubText = ['Learn more']

    /**
   * Class constructor
   * @param {list} props: List of projects data by type.
   */
    constructor(props: Props) {
      super(props)
      this.projects = props.projectsData
    }

    /**
   * Renders Responsive view of Projects's body page.
   * @return {renderized_component} Heder, Content, and footer.
   */
    render() {
      const { other, carrousel, main } = this.projects
      document.title = 'RoBorregos | Projects'
      return (
        <>
          <HeaderBanner
            title={this.headerTitle}
            mainText={this.headerMainText}
            subText={this.headerSubText}
          />
          <ProjectsContent main_projects={main} carousels={carrousel} other_projects={other} />
        </>
      )
    }
}

export default Projects
