// @flow
import React from 'react'
import ProjectsCard from './ProjectsCard/ProjectsCard'
import ProjectsCarousel from './ProjectsCarousel/ProjectsCarousel'
import ProjectsOther from './ProjectsOther/ProjectsOther'

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

type Props = {
  main_projects: Array<Project>,
  carousels: Array<Array<Project>>,
  other_projects: Array<OtherProjects>
};

const ProjectsContent = ({ main_projects, carousels, other_projects }: Props) => (
  <div>
    {main_projects.map((project, index) => (
      <ProjectsCard key={project.title} project={project} index={index} />
    ))}
    <ProjectsCarousel project_carousels={carousels} main_counter={main_projects.length} />
    <ProjectsOther projects={other_projects} />
  </div>
)

export default ProjectsContent
