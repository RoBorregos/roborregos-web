// @flow
import React from 'react'

const items = [
  { icon: 'fas fa-users', text: '52 members' },
  { icon: 'fas fa-history', text: 'Since 2015' },
  { icon: 'fas fa-globe-americas', text: 'Globally known' },
]

const HomeMiniInformation = () => (
  <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 px-6 py-16">
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.text} className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-roboblue text-3xl text-white shadow-[0_0_40px_rgba(10,56,239,0.45)]">
            <i className={item.icon} />
          </div>
          <h5 className="font-anton text-xl uppercase tracking-wide">{item.text}</h5>
        </div>
      ))}
    </div>
  </section>
)

export default HomeMiniInformation
