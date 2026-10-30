// @flow
import React, { useState, useEffect, useRef } from 'react'

const TOTAL = 24
const INTERVAL = 4500
const photos = Array.from({ length: TOTAL }, (_, i) => require(`../../../images/about/history/${i + 1}.jpg`))

const pad = (n: number) => String(n + 1).padStart(2, '0')

function AboutHistoryReel({ language }: { language: number }) {
  const spanish = language === 0
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const thumbs = useRef(null)

  const go = (delta: number) => setCurrent((c) => (c + delta + TOTAL) % TOTAL)

  useEffect(() => {
    if (paused) return undefined
    const id = setTimeout(() => go(1), INTERVAL)
    return () => clearTimeout(id)
  }, [current, paused])

  useEffect(() => {
    const el = thumbs.current && thumbs.current.children[current]
    if (el && thumbs.current) {
      thumbs.current.scrollTo({ left: el.offsetLeft - thumbs.current.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
    }
  }, [current])

  const onKeyDown = (e: SyntheticKeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <section
      className="relative overflow-hidden bg-neutral-950 py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
    >
      {/* blurred backdrop of the current photo */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-30 blur-2xl transition-all duration-1000"
        style={{ backgroundImage: `url(${photos[current]})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" aria-hidden="true" />

      <div className="relative px-6">
        <p className="mb-2 text-center font-anton text-sm uppercase tracking-[0.4em] text-steel">
          {spanish ? 'Álbum del equipo' : 'Team album'}
        </p>
        <h2 className="section-title mb-12 text-center">
          {spanish ? 'Recuerdos en el camino' : 'Memories along the way'}
        </h2>

        <div className="mx-auto flex max-w-5xl items-center gap-2 md:gap-6">
          <button type="button" aria-label={spanish ? 'Anterior' : 'Previous'} onClick={() => go(-1)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-steel bg-black/40 transition hover:bg-roboblue">
            <i className="fas fa-chevron-left" />
          </button>

          <div className="relative flex-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border-[10px] border-b-[44px] border-white bg-white shadow-[0_20px_60px_rgba(0,0,0,0.7)] md:rotate-[-1.5deg]">
              {photos.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${spanish ? 'Recuerdo' : 'Memory'} ${pad(i)}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
              <span className="absolute bottom-[-36px] left-0 right-0 text-center font-jersey text-2xl text-neutral-700">
                {pad(current)} / {pad(TOTAL - 1)}
              </span>
            </div>
          </div>

          <button type="button" aria-label={spanish ? 'Siguiente' : 'Next'} onClick={() => go(1)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-steel bg-black/40 transition hover:bg-roboblue">
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        {/* progress bar for autoplay */}
        <div className="mx-auto mt-8 h-0.5 max-w-5xl overflow-hidden bg-white/10">
          <div
            key={`${current}-${paused}`}
            className="h-full bg-roboblue"
            style={{ width: paused ? '100%' : undefined, animation: paused ? undefined : `reel-progress ${INTERVAL}ms linear forwards` }}
          />
        </div>

        {/* filmstrip */}
        <div ref={thumbs} className="mx-auto mt-6 flex max-w-5xl gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: 'thin' }}>
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`${spanish ? 'Ir a recuerdo' : 'Go to memory'} ${pad(i)}`}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded transition duration-300 ${i === current ? 'opacity-100 ring-2 ring-roboblue' : 'opacity-40 hover:opacity-80'}`}
            >
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutHistoryReel
