// @flow
import React from 'react'

const values = [
  {
    title: 'It\'s all about people',
    text: 'Everything we accomplish is thanks to the trust we put in each other and the passion we share for robotics and technology; we feel proud to have valuable members with different talents and perspectives that contribute to reaching our goals.',
  },
  {
    title: 'Open Source',
    text: 'Sharing knowledge and making it accessible is how we make our members and community grow and tech development transcend.',
  },
  {
    title: 'Curiosity to innovate',
    text: 'With technology, there are always new ways in which solutions can be developed to be better, and we are hungry to discover them. There is always space to improve, grow, learn and create, and we always look for new challenges.',
  },
]

const MembersValues = () => (
  <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 px-6 py-20">
    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
      {values.map((v) => (
        <div key={v.title} className="rb-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(10,56,239,0.35)]">
          <h3 className="mb-4 font-jersey text-4xl text-roboblue">{v.title}</h3>
          <p className="leading-relaxed text-gray-300">{v.text}</p>
        </div>
      ))}
    </div>
  </section>
)

export default MembersValues
