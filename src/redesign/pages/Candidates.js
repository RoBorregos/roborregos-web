import React, { useRef, useState } from 'react'
import positionsData from '../../data/positions.json'
import learn1 from '../../images/candidates/carousel_learn/learn1.jpg'
import learn2 from '../../images/candidates/carousel_learn/learn2.jpg'
import learn4 from '../../images/candidates/carousel_learn/learn4.jpg'
import hack1 from '../../images/candidates/carousel_hack/hack1.jpg'
import hack2 from '../../images/candidates/carousel_hack/hack2.jpg'
import hack3 from '../../images/candidates/carousel_hack/hack3.jpg'
import succeed1 from '../../images/candidates/carousel_succeed/succeed1.jpg'
import succeed2 from '../../images/candidates/carousel_succeed/succeed2.jpg'
import succeed4 from '../../images/candidates/carousel_succeed/succeed4.jpg'
import {
  PageHead, Icons, roleImg, scrollToId, socials, useDocumentTitle,
} from '../lib'
import { JoinSheet } from '../Forms'
import './Candidates.css'

const phases = [
  {
    id: 'learn',
    label: 'Learn',
    text: 'Weekly classes in programming, electronics and mechanics, taught by team members. No experience needed, and every major and semester is welcome.',
    imgs: [learn2, learn1, learn4],
  },
  {
    id: 'hack',
    label: 'Hack',
    text: 'Form a team, design your own robot and iterate with mentoring from current members.',
    imgs: [hack1, hack2, hack3],
  },
  {
    id: 'succeed',
    label: 'Succeed',
    text: 'Compete in our internal robotics tournament. The strongest candidates join RoBorregos and start building for real competitions.',
    imgs: [succeed1, succeed2, succeed4],
  },
]

const playlists = [
  { id: 'PLbuFimxJ80Ynff7bdQjdIO7uKH1vZ-Jne', title: 'Candidates class playlist' },
  { id: 'PLbuFimxJ80Yn97HhHeuvBvN47Z7cGHAI9', title: 'Second class playlist' },
  { id: 'PLbuFimxJ80YksGyBqJRjT6_nY0yWKpuzI', title: 'Third class playlist' },
]

export default function Candidates() {
  useDocumentTitle('Candidates')
  const [phase, setPhase] = useState(0)
  const [applying, setApplying] = useState(null)
  const tabRefs = useRef([])
  const current = phases[phase]

  const onTabKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const next = (phase + (e.key === 'ArrowRight' ? 1 : -1) + phases.length) % phases.length
    setPhase(next)
    tabRefs.current[next].focus()
  }

  return (
    <main>
      <PageHead
        title="Candidates: learn to build a robot."
        lead="Our yearly recruiting program. Students from any major and semester take free classes, build a robot as a team and compete in our tournament. The best join RoBorregos."
      >
        <button type="button" className="checkpoint" onClick={() => scrollToId('roles')}>
          Choose your role
          <Icons.Down />
        </button>
        <a href="#classes" className="btn">Watch the classes first</a>
      </PageHead>

      <section className="section">
        <div className="field cand-video">
          <div className="video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/Iec50DS8R9Y?rel=0"
              title="What is Candidates?"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <div className="threshold" />

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">How Candidates works</h2>
          </div>
          <div className="path" role="tablist" aria-label="Candidates phases">
            {phases.map((p, i) => (
              <button
                key={p.id}
                ref={(node) => { tabRefs.current[i] = node }}
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={phase === i}
                aria-controls="phase-panel"
                tabIndex={phase === i ? 0 : -1}
                className="path__step"
                onClick={() => setPhase(i)}
                onKeyDown={onTabKey}
              >
                <span className="path__label">{p.label}</span>
                {i < phases.length - 1 && <Icons.Arrow className="path__arrow" />}
              </button>
            ))}
          </div>
          <div className="phase" id="phase-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`}>
            <p className="lead phase__text" key={`t-${current.id}`}>{current.text}</p>
            <div className="phase__mosaic" key={current.id}>
              {current.imgs.map((src, i) => (
                <div key={src} className={`photo phase__img phase__img--${i}`} style={{ '--i': i }}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="threshold" />

      <section className="section" id="roles">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">Choose your role</h2>
            <p className="lead">Pick the area you want to grow in. You'll work on a real robot from the first week.</p>
          </div>
          <ul className="roles">
            {positionsData.positions.map((p) => (
              <li key={p.id} className="role">
                <div className="photo role__img"><img src={roleImg(p.path)} alt="" loading="lazy" /></div>
                <h3 className="h3">{p.title}</h3>
                <p className="body-2">{p.shortDescription}</p>
                <button type="button" className="btn btn--sm" onClick={() => setApplying(p)}>
                  {`Apply as ${p.title}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="threshold" />

      <section className="section" id="classes">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">Take the classes now</h2>
            <p className="lead">Every Candidates class is on YouTube, free. Start before the program does.</p>
          </div>
          <div className="playlists">
            {playlists.map((p, i) => (
              <div key={p.id} className={`video playlists__item playlists__item--${i}`}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=${p.id}`}
                  title={p.title}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ask">
        <div className="field ask__inner">
          <div>
            <h2 className="h2">Questions before you apply?</h2>
            <p className="ask__text">Message us. Current members answer.</p>
          </div>
          <div className="ask__links">
            {socials.filter((s) => ['Instagram', 'Facebook'].includes(s.name)).map(({ name, handle, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" className="btn btn--on-hole">
                <Icon />
                {`${handle} on ${name}`}
              </a>
            ))}
          </div>
        </div>
      </section>

      {applying && <JoinSheet position={applying} onClose={() => setApplying(null)} />}
    </main>
  )
}
