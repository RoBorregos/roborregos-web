import React, { useState, useEffect } from 'react'

const IMAGES_NUMBER = 28

function tryRequire(imgPath: string) {
  try {
    return require(`../../../images/home/carousel/${imgPath}`)
  } catch (err) {
    return imgPath
  }
}

const images = Array.from({ length: IMAGES_NUMBER }, (_, i) => tryRequire(`${i + 1}.jpg`))

const HomeCarousel = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000)
    return () => clearInterval(id)
  }, [])

  const go = (delta: number) => setCurrent((c) => (c + delta + images.length) % images.length)

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`RoBorregos ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

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
    </section>
  )
}

export default HomeCarousel
