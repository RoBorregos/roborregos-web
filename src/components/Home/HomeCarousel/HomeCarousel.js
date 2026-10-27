import React, { useState, useEffect } from 'react'

const IMAGES_NUMBER = 28

function tryRequire(imgPath: string) {
  try {
    return require(`../../../images/home/carousel/${imgPath}`)
  } catch (err) {
    return imgPath
  }
}

// photos are almost all 3:2; the few portrait ones are shown whole instead of cropped
const PORTRAIT = [15, 16, 19, 20]

const images = Array.from({ length: IMAGES_NUMBER }, (_, i) => tryRequire(`${i + 1}.jpg`))

const HomeCarousel = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000)
    return () => clearInterval(id)
  }, [])

  const go = (delta: number) => setCurrent((c) => (c + delta + images.length) % images.length)

  return (
    <section className="bg-black px-4 py-12 md:px-8">
      <div className="relative mx-auto aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-xl bg-card shadow-[0_0_40px_rgba(10,56,239,0.25)]">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`RoBorregos ${index + 1}`}
            className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
              PORTRAIT.includes(index + 1) ? 'object-contain' : 'object-cover'
            } ${index === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <button
        type="button"
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl transition hover:bg-roboblue"
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl transition hover:bg-roboblue"
      >
        <i className="fas fa-chevron-right" />
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? 'w-6 bg-roboblue' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
      </div>
    </section>
  )
}

export default HomeCarousel
