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

// Focal point for photos whose subject gets cropped by the default centered cover
const focalPoint = { [Succeed2]: '50% 75%', [Learn2]: '50% 20%' }

// Bento layout: tiles always fill the grid (2 rows on desktop) with no empty cells
const tileClass = (i: number, count: number) => {
  if (i === 0) return 'col-span-2 md:row-span-2'
  if (count === 3) return 'md:col-span-2'
  if (i === 1) return 'md:col-span-2'
  if (i === count - 1) return 'col-span-2 md:col-span-1'
  return ''
}

const CandidatesCarousel = () => {
  const [current, setCurrent] = useState(0)
  const go = (d: number) => setCurrent((c) => (c + d + slides.length) % slides.length)
  const slide = slides[current]

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title mb-8 text-center">{slide.title}</h2>
        <div className="grid h-[60vh] auto-rows-fr grid-cols-2 gap-3 overflow-hidden md:grid-cols-4 md:grid-rows-2">
          {slide.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${slide.title} ${i + 1}`}
              style={focalPoint[src] ? { objectPosition: focalPoint[src] } : undefined}
              className={`h-full min-h-0 w-full rounded-xl object-cover ${tileClass(i, slide.images.length)}`}
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
