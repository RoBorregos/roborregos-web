// @flow
import React from 'react'
import youtubeLogo from '../../../images/candidates/youtube-logo.png'

const embed = (list: string) => `https://www.youtube.com/embed/videoseries?list=${list}`
const allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'

function CandidatesClasses() {
  return (
    <section className="bg-gradient-to-tr from-neutral-950 to-neutral-800 px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_1.4fr_1fr]">
        <div className="text-center md:text-left">
          <h2 className="section-title mb-4 !text-4xl md:!text-5xl">Learn with us on</h2>
          <img className="mx-auto h-20 md:mx-0" src={youtubeLogo} alt="youtube-logo" />
          <p className="mt-4 text-lg text-gray-300">And be prepared to take the challenge!</p>
        </div>
        <iframe
          className="aspect-video w-full rounded-xl"
          src={embed('PLbuFimxJ80Ynff7bdQjdIO7uKH1vZ-Jne')}
          title="YouTube main playlist"
          frameBorder="0"
          allow={allow}
          allowFullScreen
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {['PLbuFimxJ80Yn97HhHeuvBvN47Z7cGHAI9', 'PLbuFimxJ80YksGyBqJRjT6_nY0yWKpuzI'].map((list) => (
            <iframe
              key={list}
              className="aspect-video w-full rounded-xl"
              src={embed(list)}
              title="YouTube playlist"
              frameBorder="0"
              allow={allow}
              allowFullScreen
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CandidatesClasses
