import React from 'react'
import projectsData from '../../data/projects.json'
import {
  PageHead, Icons, projectImg, useDocumentTitle,
} from '../lib'
import './Projects.css'

const linkLabel = (url) => {
  if (url.includes('youtube')) return 'Watch the video'
  if (url.includes('github')) return 'Read the docs on GitHub'
  return 'Learn more'
}

function ProjectLink({ url }) {
  if (!url) return <span className="small">Documentation coming soon</span>
  return (
    <a href={url} target="_blank" rel="noreferrer" className="text-link">
      {linkLabel(url)}
      <Icons.ArrowOut />
    </a>
  )
}

export default function Projects() {
  useDocumentTitle('Projects')
  const { main, carrousel, other } = projectsData
  const teams = carrousel.flat()

  return (
    <main>
      <PageHead
        title="Robots we design, build and program."
        lead="Four flagship projects, seven competition teams and a handful of community tools. Every robot here was designed and built by students."
      />

      <section className="section">
        <div className="field">
          <ol className="flagship-list">
            {main.map((p, i) => (
              <li key={p.title} className={`fl ${i % 2 ? 'fl--flip' : ''}`}>
                <div className="photo fl__img"><img src={projectImg(p.image)} alt={p.title} loading="lazy" /></div>
                <div className="fl__text">
                  <h2 className="h2">{p.title}</h2>
                  <p className="body-2">{p.description}</p>
                  <ProjectLink url={p.wiki} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="threshold" />

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">Competition teams</h2>
            <p className="lead">Each team builds its own robot for a league at TMR, RoboCup or IEEE LARC.</p>
          </div>
          <ul className="teams">
            {teams.map((p) => (
              <li key={p.title} className="team">
                <div className="photo team__img"><img src={projectImg(p.image)} alt="" loading="lazy" /></div>
                <h3 className="h3">{p.title}</h3>
                <p className="body-2">{p.description}</p>
                <ProjectLink url={p.wiki} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="threshold" />

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">Community projects</h2>
            <p className="lead">Smaller tools and experiments, open for anyone to explore.</p>
          </div>
          <ul className="side">
            {other.map((p) => (
              <li key={p.title}>
                <a href={p.wiki} target="_blank" rel="noreferrer" className="side__row">
                  <div className="photo side__img"><img src={projectImg(p.image)} alt="" loading="lazy" /></div>
                  <span className="side__name">{p.title}</span>
                  <Icons.ArrowOut />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
