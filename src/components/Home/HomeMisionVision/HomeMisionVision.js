// @flow
import React from 'react'
import misionImg from '../../../images/home/mision-vision/mision.jpg'
import visionImg from '../../../images/home/mision-vision/vision.jpeg'

const blocks = [
  {
    title: 'Mission',
    img: misionImg,
    text: 'Create a community that integrates students, teachers, alumni, companies, institutions and society in general to promote the development of robotics in Mexico.',
    right: false,
  },
  {
    title: 'Vision',
    img: visionImg,
    text: 'Inspire future generations of the robotics community in Latin America.',
    right: true,
  },
]

const HomeMisionVision = () => (
  <section>
    {blocks.map((b) => (
      <div
        key={b.title}
        className="relative flex min-h-[60vh] items-center overflow-hidden px-6 py-16 lg:px-24"
      >
        <img src={b.img} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className={`relative z-10 w-full ${b.right ? 'flex justify-end' : ''}`}>
          <div className="rb-card max-w-xl bg-black/60 backdrop-blur">
            <h2 className="section-title mb-4">{b.title}</h2>
            <p className="text-lg leading-relaxed text-gray-200">{b.text}</p>
          </div>
        </div>
      </div>
    ))}
  </section>
)

export default HomeMisionVision
