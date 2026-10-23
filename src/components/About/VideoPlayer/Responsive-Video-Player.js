// @flow
import React from 'react'

function RoborregosVideo() {
  return (
    <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 px-6 py-20">
      <h2 className="section-title mb-10 text-center">Why are we RoBorregos?</h2>
      <div className="mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-xl shadow-[0_0_60px_rgba(10,56,239,0.35)]">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/LT7QiBrgZ4w?controls=0"
          title="Roborregos video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export default RoborregosVideo
