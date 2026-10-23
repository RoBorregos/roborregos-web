// @flow
import React from 'react'

function CandidatesVideo() {
  return (
    <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 px-6 py-20 text-center">
      <h2 className="section-title">What is Candidates?</h2>
      <p className="section-subtitle mb-10 mt-2">Learn, hack, and succeed</p>
      <div className="mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-xl shadow-[0_0_60px_rgba(10,56,239,0.35)]">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/Iec50DS8R9Y?controls=0"
          title="Candidates video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export default CandidatesVideo
