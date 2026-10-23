// @flow
import React, { useState } from 'react'
import Learn1 from '../../../images/candidates/carousel_learn/learn1.jpg'
import Learn2 from '../../../images/candidates/carousel_learn/learn2.jpg'
import Learn3 from '../../../images/candidates/carousel_learn/learn3.jpg'
import Learn4 from '../../../images/candidates/carousel_learn/learn4.jpg'
import Hack1 from '../../../images/candidates/carousel_hack/hack1.jpg'
import Hack2 from '../../../images/candidates/carousel_hack/hack2.jpg'
import Hack3 from '../../../images/candidates/carousel_hack/hack3.jpg'
import Succeed1 from '../../../images/candidates/carousel_succeed/succeed1.jpg'
import Succeed2 from '../../../images/candidates/carousel_succeed/succeed2.jpg'
import Succeed3 from '../../../images/candidates/carousel_succeed/succeed3.jpg'
import Succeed4 from '../../../images/candidates/carousel_succeed/succeed4.jpg'

const slides = [
  { title: 'Learn', images: [Learn1, Learn2, Learn3, Learn4] },
  { title: 'Hack', images: [Hack1, Hack2, Hack3] },
  { title: 'Succeed', images: [Succeed1, Succeed2, Succeed3, Succeed4] },
]

const CandidatesCarousel = () => {
  const [current, setCurrent] = useState(0)
  const go = (d: number) => setCurrent((c) => (c + d + slides.length) % slides.length)
  const slide = slides[current]

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title mb-8 text-center">{slide.title}</h2>
        <div className="grid h-[60vh] grid-cols-2 gap-3 md:grid-cols-4">
          {slide.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${slide.title} ${i + 1}`}
              className={`h-full w-full rounded-xl object-cover ${i === 0 ? 'col-span-2 md:row-span-1' : ''}`}
            />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-steel transition hover:bg-roboblue">
            <i className="fas fa-chevron-left" />
          </button>
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={s.title}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all ${i === current ? 'w-8 bg-roboblue' : 'w-2.5 bg-white/40'}`}
            />
          ))}
          <button type="button" aria-label="Next" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-steel transition hover:bg-roboblue">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CandidatesCarousel
