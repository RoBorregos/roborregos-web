// @flow
import React, { useState, useMemo } from 'react'
import placeholder from '../../../images/placeholder-rectangle.png'
import timelineData from '../../../data/timeline.json'

type Event = {
    date: string,
    img_path: string,
    title: string,
    description: string,
    year: number,
    month: number
};

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../images/about/timeline/${imgPath}.jpg`)
  } catch (err) {
    return placeholder
  }
}

function AboutTimeline({ language }: { language: number }) {
  const { events, years } = timelineData
  const sortedYears = useMemo(() => [...years].sort((a, b) => b - a), [years])
  const [selectedYear, setSelectedYear] = useState(sortedYears[0])

  const yearEvents = useMemo(
    () => events
      .filter((e: Event) => e.year === selectedYear)
      .sort((a: Event, b: Event) => b.month - a.month),
    [events, selectedYear],
  )

  return (
    <section className="bg-black px-6 py-20" test-id="1">
      <h2 className="section-title mb-4 text-center">{language === 0 ? 'Un recorrido por nuestra historia' : 'A Journey Through Our History'}</h2>
      <p className="mx-auto mb-10 max-w-3xl text-center text-lg leading-relaxed text-gray-300">
        {language === 0
          ? 'Explora los logros, las personas y las experiencias que han formado a RoBorregos a través de los años.'
          : 'Explore the milestones, people and experiences that have shaped RoBorregos throughout the years.'}
      </p>

      <div className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-3">
        {sortedYears.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setSelectedYear(year)}
            className={`rounded-full px-5 py-2 font-anton text-lg tracking-wide transition duration-300 ${
              year === selectedYear
                ? 'bg-roboblue text-white'
                : 'border border-gray-700 text-gray-400 hover:border-roboblue hover:text-white'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {yearEvents.map((event: Event) => (
          <article key={`${event.date}-${event.title}`} className="group overflow-hidden rounded-xl bg-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(10,56,239,0.4)]">
            <img src={tryRequire(event.img_path)} alt={event.title} className="h-56 w-full object-cover" />
            <div className="p-6">
              <span className="font-anton text-sm uppercase tracking-widest text-steel">{event.date}</span>
              <h3 className="mb-3 mt-1 font-anton text-2xl uppercase">{event.title}</h3>
              <p className="text-sm leading-relaxed text-gray-300">{event.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AboutTimeline
