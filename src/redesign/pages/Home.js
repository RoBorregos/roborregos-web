import React from 'react'
import { Link } from 'react-router-dom'
import sponsorsData from '../../data/sponsors.json'
import projectsData from '../../data/projects.json'
import timelineData from '../../data/timeline.json'
import heroImg from '../../images/home/carousel/3.jpg'
import highPerformance from '../../images/about/carousel/High-Performance.jpg'
import socialProjects from '../../images/about/carousel/Social-Projects.jpg'
import events from '../../images/about/carousel/Events.jpg'
import community from '../../images/about/carousel/Student-Community.jpg'
import {
  Icons, galleryImg, projectImg, sponsorImg, useDocumentTitle, useMedia,
} from '../lib'
import './Home.css'

/* ------------------------------ Field layouts ------------------------------ */
// Areas are 1-based [colStart, colEnd, rowStart, rowEnd] on the tile grid; walls are in tile units.
const LAYOUTS = {
  wide: {
    cols: 12,
    rows: 5,
    head: [1, 7, 1, 5],
    photo: [7, 13, 1, 4],
    apply: [1, 4, 5, 6],
    sponsor: [4, 7, 5, 6],
    hole: [7, 13, 4, 6],
    walls: [[0, 0, 12, 0], [12, 0, 12, 5], [12, 5, 0, 5], [0, 5, 0, 0], [6, 3, 12, 3], [6, 3, 6, 5]],
  },
  narrow: {
    cols: 6,
    rows: 14,
    head: [1, 7, 1, 5],
    photo: [1, 7, 5, 9],
    apply: [1, 4, 9, 11],
    sponsor: [4, 7, 9, 11],
    hole: [1, 7, 11, 15],
    walls: [[0, 0, 6, 0], [6, 0, 6, 14], [6, 14, 0, 14], [0, 14, 0, 0], [0, 10, 6, 10]],
  },
}

const area = ([c1, c2, r1, r2]) => ({ gridColumn: `${c1} / ${c2}`, gridRow: `${r1} / ${r2}` })

function FieldHero() {
  const wide = useMedia('(min-width: 821px)')
  const L = wide ? LAYOUTS.wide : LAYOUTS.narrow

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="field">
        <div
          className="tiles seams hero__field"
          style={{ gridTemplateRows: `repeat(${L.rows}, var(--tile))` }}
        >
          <div className="hero__head" style={area(L.head)}>
            <h1 id="hero-title" className="display">The robotics team of Tec de Monterrey.</h1>
            <p className="lead">
              Students designing, building and programming autonomous robots for TMR,
              RoboCup and IEEE LARC since 2015.
            </p>
          </div>

          <div className="photo hero__photo" style={area(L.photo)}>
            <img src={heroImg} alt="The RoBorregos team with their robots at a national competition" />
          </div>

          <Link to="/candidates" className="checkpoint hero__cp" style={area(L.apply)}>
            Apply to Candidates
            <Icons.Arrow />
          </Link>
          <Link to="/support-us" className="checkpoint hero__cp" style={area(L.sponsor)}>
            Become a sponsor
            <Icons.Arrow />
          </Link>

          <div className="hero__hole" style={area(L.hole)}>
            <p>
              <strong>March 2015, Mexico City.</strong>
              {' '}
              Four students win Rescue Maze at the Mexican Robotics Tournament.
              That robot is where RoBorregos starts.
            </p>
            <Link to="/about" className="text-link">
              Read our story
              <Icons.Arrow />
            </Link>
          </div>

          <svg
            className="hero__overlay"
            viewBox={`0 0 ${L.cols} ${L.rows}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {L.walls.map(([x1, y1, x2, y2]) => (
              <line key={`${x1}${y1}${x2}${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} className="hero__wall" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Sections ------------------------------ */
const work = [
  {
    title: 'A high-performance team',
    text: "We compete in Mexico's TMR, RoboCup and IEEE LARC, designing every robot from scratch to show what Mexican engineering can do.",
    img: highPerformance,
  },
  {
    title: 'Classes anyone can take',
    text: 'Free classes, workshops and webinars on the technology we use, from ROS and Git to machine learning.',
    img: socialProjects,
  },
  {
    title: 'Events and outreach',
    text: 'INCMty, Conexión Tec, Semana i and congresses on mechatronics, automation and technology.',
    img: events,
  },
  {
    title: 'Candidates, every year',
    text: 'Weekly classes in programming, mechanics and electronics for any student at the university, ending in a robotics tournament.',
    img: community,
  },
]

const RESULT = /(\d+(st|nd|rd|th) place|first place|won |winner|award|champion|top 10)/i

export default function Home() {
  useDocumentTitle('')
  const results = timelineData.events.filter((e) => RESULT.test(e.description)).reverse()

  return (
    <main>
      <FieldHero />

      <section className="sponsors" aria-labelledby="sponsors-title">
        <div className="field sponsors__head">
          <h2 id="sponsors-title" className="h3">Supported by</h2>
          <Link to="/support-us" className="text-link">
            Become a sponsor
            <Icons.Arrow />
          </Link>
        </div>
        <div className="sponsors__track-wrap">
          {/* Two identical runs scroll as one band; the copy is hidden from assistive tech. */}
          {[0, 1].map((copy) => (
            <ul key={copy} className="sponsors__track" aria-hidden={copy === 1 ? true : undefined}>
              {[...sponsorsData.sponsors, ...sponsorsData.sponsors].map((sp, i) => (
                <li key={`${sp.name}-${i}`} aria-hidden={i >= sponsorsData.sponsors.length ? true : undefined}>
                  <a
                    href={sp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="sponsors__logo"
                    tabIndex={copy === 1 || i >= sponsorsData.sponsors.length ? -1 : undefined}
                  >
                    <img src={sponsorImg(sp.img_path)} alt={sp.name} />
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">What the team does</h2>
          </div>
          <ul className="work">
            {work.map((w) => (
              <li key={w.title} className="work__row">
                <div className="photo work__img"><img src={w.img} alt="" loading="lazy" /></div>
                <h3 className="h3">{w.title}</h3>
                <p className="body-2">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="threshold" />

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">Results on the record</h2>
            <p className="lead">
              {`Every line below is a dated entry from our timeline: ${results.length} results since 2015.`}
            </p>
          </div>
          <ol className="record">
            {results.slice(0, 10).map((e) => (
              <li key={e.img_path} className="record__row">
                <time className="record__date">{e.date}</time>
                <span className="record__event">{e.title}</span>
                <span className="record__what">{e.description}</span>
              </li>
            ))}
          </ol>
          <Link to="/about" className="btn record__more">
            {`See all ${timelineData.events.length} timeline entries`}
            <Icons.Arrow />
          </Link>
        </div>
      </section>

      <div className="threshold" />

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">Flagship robots</h2>
            <p className="lead">Four long-running projects, from a home-service robot to an automated factory.</p>
          </div>
          <ul className="flagships">
            {projectsData.main.map((p) => (
              <li key={p.title}>
                <Link to="/projects" className="flagship">
                  <div className="photo flagship__img"><img src={projectImg(p.image)} alt="" loading="lazy" /></div>
                  <span className="flagship__name">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="threshold" />

      <section className="section gallery" aria-labelledby="gallery-title">
        <div className="field gallery__head">
          <h2 id="gallery-title" className="h2">From the pits</h2>
          <p className="small">Scroll sideways</p>
        </div>
        <ul className="gallery__strip">
          {Array.from({ length: 18 }, (_, i) => (
            <li key={i} className="photo gallery__tile"><img src={galleryImg(i + 1)} alt="" loading="lazy" /></li>
          ))}
        </ul>
      </section>
    </main>
  )
}
