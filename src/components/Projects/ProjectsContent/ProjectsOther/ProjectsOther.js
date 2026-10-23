import React from 'react'
import placeholder from '../../../../images/placeholder-rectangle.png'

type Project = {
  title: string,
  image: string,
  wiki: string,
  background: string,
  color: string
};

type Props = {
  projects: Array<Project>
};

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../../images/projects/${imgPath}`)
  } catch (err) {
    return placeholder
  }
}

const ProjectsOther = ({ projects }: Props) => (
  <section className="bg-gradient-to-tr from-neutral-950 to-neutral-800 px-6 py-20">
    <div className="mx-auto max-w-6xl">
      <h2 className="section-title mb-4 text-center">Other projects</h2>
      <p className="mb-12 text-center text-lg text-gray-300">
        Check out other interesting tech projects developed by the community!
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <a
            key={project.title}
            id={`other-project-${project.image}`}
            href={project.wiki}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(10,56,239,0.4)]"
          >
            <img src={tryRequire(`${project.image}.jpg`)} alt={project.title} className="h-44 w-full object-cover" />
            <p className="p-4 font-anton text-lg uppercase tracking-wide group-hover:text-bright">{project.title}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
)

export default ProjectsOther
