// @flow
import React from 'react'

const items = [
  { icon: 'fas fa-trophy', value: '#9', text: 'In the world, RoboCup@Home 2026' },
  { icon: 'fas fa-globe-americas', value: '#1', text: 'In Mexico and the Americas, 2026' },
  { icon: 'fas fa-users', value: '52', text: 'Members' },
  { icon: 'fas fa-history', value: '2015', text: 'Building robots since' },
]

const HomeMiniInformation = () => (
  <section className="bg-grid bg-neutral-950 px-6 py-16">
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.text} className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-roboblue text-2xl text-white shadow-[0_0_40px_rgba(10,56,239,0.45)]">
            <i className={item.icon} />
          </div>
          <span className="font-jersey text-5xl text-bright">{item.value}</span>
          <h5 className="font-anton text-base uppercase tracking-wide text-gray-200">{item.text}</h5>
        </div>
      ))}
    </div>
  </section>
)

export default HomeMiniInformation
