// @flow
import React, { useState } from 'react'
import ProjectsCard from '../ProjectsCard/ProjectsCard'

type Project = {
  title: string,
  description: string,
  image: string,
  wiki: string
};

type Props = {
  project_carousels: Array<Array<Project>>,
  main_counter: number
};

const SingleCarousel = ({ projects }: { projects: Array<Project> }) => {
  const [current, setCurrent] = useState(0)
  const go = (d: number) => setCurrent((c) => (c + d + projects.length) % projects.length)

  return (
    <div className="relative border-t border-gray-800 py-6">
      <ProjectsCard project={projects[current]} index={current} />
      <div className="flex items-center justify-center gap-4 pb-4">
        <button type="button" aria-label="Previous" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-steel transition hover:bg-roboblue">
          <i className="fas fa-chevron-left" />
        </button>
        <span className="font-anton text-gray-500">{current + 1} / {projects.length}</span>
        <button type="button" aria-label="Next" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-steel transition hover:bg-roboblue">
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </div>
  )
}

const ProjectsCarousel = ({ project_carousels }: Props) => (
  <div>
    {project_carousels.map((projects) => (
      <SingleCarousel key={projects[0].title} projects={projects} />
    ))}
  </div>
)

export default ProjectsCarousel
