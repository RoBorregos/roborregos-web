// @flow
import React from 'react'

const steps = [
  {
    title: 'Build your own robot',
    text: 'Design, program and assemble an autonomous robot from scratch, with weeks of work outside of class.',
  },
  {
    title: 'Test it in Candidates',
    text: 'Your robot has to solve real challenges, live. Theory is not enough: it has to work.',
  },
  {
    title: 'Join the team',
    text: 'Those selected join projects that compete in national and international tournaments.',
  },
]

const CandidatesProcess = () => (
  <section className="px-6 py-20">
    <div className="mx-auto max-w-6xl">
      <h2 className="section-title mb-12 text-center">How do you become a RoBorrego?</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="rb-card">
            <span className="font-jersey text-6xl text-bright">{i + 1}</span>
            <h3 className="mb-3 mt-2 font-anton text-2xl uppercase tracking-wide">{step.title}</h3>
            <p className="leading-relaxed text-gray-300">{step.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-xl bg-gradient-to-r from-navy to-black p-8 text-center">
        <span className="font-jersey text-6xl text-white md:text-7xl">15 of 200</span>
        <p className="mx-auto mt-3 max-w-2xl text-gray-200">
          Only about 1 in 10 applicants gets in. Every RoBorrego has already shown technical ability,
          commitment and resilience before their first interview.
        </p>
      </div>
    </div>
  </section>
)

export default CandidatesProcess
