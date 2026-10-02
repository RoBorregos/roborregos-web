import React, { useEffect, useMemo, useRef, useState } from 'react'
import timelineData from '../../data/timeline.json'
import highPerformance from '../../images/about/carousel/High-Performance.jpg'
import {
  PageHead, timelineImg, useDocumentTitle,
} from '../lib'
import { Robot } from '../Chrome'
import './About.css'

export default function About() {
  useDocumentTitle('About')
  const { events } = timelineData

  const byYear = useMemo(() => {
    const groups = {}
    events.forEach((e) => { (groups[e.year] = groups[e.year] || []).push(e) })
    return Object.keys(groups).sort().map((year) => ({ year, items: groups[year] }))
  }, [events])

  const [activeYear, setActiveYear] = useState(byYear[0].year)
  const yearRefs = useRef({})

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveYear(entry.target.dataset.year) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    Object.values(yearRefs.current).forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [byYear])

  const jumpTo = (year) => {
    const node = yearRefs.current[year]
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - 110, behavior: reduce ? 'auto' : 'smooth' })
  }

  const activeIndex = byYear.findIndex((y) => y.year === activeYear)

  return (
    <main>
      <PageHead
        title="Four students, one maze, and every robot since."
        lead="In 2015 four students competed at the Mexican Robotics Tournament and earned a place at RoboCup in China. There they saw what teams from other countries were building, and what Mexico could build too. They came home and started RoBorregos so that knowledge would pass from one generation of students to the next."
      />

      <section className="section about-intro">
        <div className="field about-intro__grid">
          <div className="video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/LT7QiBrgZ4w?rel=0"
              title="Why are we RoBorregos?"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="about-intro__text">
            <h2 className="h3">Why we are RoBorregos</h2>
            <p className="body-2">
              We compete in TMR, RoboCup and IEEE LARC, teach free classes and workshops, and run
              Candidates every year so any student can learn to build a robot. Everything we learn
              goes back to the community.
            </p>
            <div className="photo about-intro__photo"><img src={highPerformance} alt="RoBorregos members testing a robot" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <div className="threshold" />

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">The timeline</h2>
            <p className="lead">{`${events.length} dated entries from ${byYear[0].year} to ${byYear[byYear.length - 1].year}, oldest first.`}</p>
          </div>
          <div className="tl">
            <nav className="tl__rail" aria-label="Jump to year">
              <ol>
                {byYear.map(({ year }, i) => (
                  <li key={year}>
                    <button
                      type="button"
                      aria-current={activeYear === year ? 'true' : undefined}
                      onClick={() => jumpTo(year)}
                    >
                      {activeYear === year && <Robot className="tl__chip-robot" heading={90} />}
                      {year}
                    </button>
                  </li>
                ))}
              </ol>
              <Robot className="tl__robot" heading={180} style={{ transform: `translateY(calc(${activeIndex} * 40px))` }} />
            </nav>
            <div className="tl__body">
              {byYear.map(({ year, items }) => (
                <section
                  key={year}
                  className="tl__year"
                  data-year={year}
                  ref={(node) => { yearRefs.current[year] = node }}
                  aria-labelledby={`y-${year}`}
                >
                  <h3 id={`y-${year}`} className="tl__year-label">{year}</h3>
                  <ol className="tl__entries">
                    {items.map((e) => (
                      <li key={e.img_path} className="tl__entry">
                        <div className="photo tl__img"><img src={timelineImg(e.img_path)} alt="" loading="lazy" /></div>
                        <div className="tl__text">
                          <time className="tl__date">{e.date}</time>
                          <h4 className="tl__title">{e.title}</h4>
                          <p className="body-2">{e.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
