import React from 'react'
import placeholder from '../../../../images/placeholder-rectangle.png'

type Project = {
  title: string,
  description: string,
  image: string,
  wiki: string
};

type Props = {
  index: number,
  project: Project,
  show_scrollers?: boolean
};

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../../images/projects/${imgPath}`)
  } catch (err) {
    return placeholder
  }
}

const ProjectsCard = ({ project, index }: Props) => (
  <article
    id={`card-${index}`}
    className={`mx-auto grid max-w-6xl items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-14 ${
      index % 2 ? 'md:[&>div:first-child]:order-2' : ''
    }`}
  >
    <div className="overflow-hidden rounded-xl shadow-[0_0_40px_rgba(10,56,239,0.25)]">
      <img
        src={tryRequire(`${project.image}.jpg`)}
        alt={project.title}
        className={`aspect-video w-full object-cover transition duration-500 hover:scale-105 ${
          project.image === 'home' ? 'object-top' : 'object-center'
        }`}
      />
    </div>
    <div>
      <h2 className="section-title mb-4 !text-4xl md:!text-6xl">{project.title}</h2>
      <p className="mb-6 text-lg leading-relaxed text-gray-300">{project.description}</p>
      {project.wiki !== '' ? (
        <a href={project.wiki} target="_blank" rel="noreferrer" className="rb-btn">Learn more</a>
      ) : (
        <span className="rb-btn-outline cursor-default opacity-60">Coming soon</span>
      )}
    </div>
  </article>
)

ProjectsCard.defaultProps = { show_scrollers: false }

export default ProjectsCard
