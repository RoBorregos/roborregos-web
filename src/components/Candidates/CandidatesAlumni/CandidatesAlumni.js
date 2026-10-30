// @flow
import React from 'react'

const alumni = [
  {
    quote: 'Applying knowledge to a real project, not a theoretical one, helps you better understand what a job requires.',
    name: 'Diego Garza',
    role: 'Senior Software Engineering Manager, Microsoft',
    detail: 'Class of 2018',
  },
  {
    quote: 'I would have struggled a lot to get my job and to understand things I use in my daily life if I had not experienced them first at RoBorregos.',
    name: 'Aurora Tijerina',
    role: 'Software Engineer III, Google',
    detail: 'Class of 2021',
  },
  {
    quote: 'Teamwork taught me the importance of effective communication and of sharing knowledge and learnings among all team members.',
    name: 'RoBorregos alumnus',
    role: 'Engineer II, Hardware Electronics, ZF Monterrey',
    detail: 'Class of 2022',
  },
  {
    quote: 'Hands-on experience in robotics R&D, working in cross-functional teams and developing at a fast pace at RoBorregos gave me the systems intuition needed for industry.',
    name: 'Adán Flores',
    role: 'Member of Technical Staff, Physical Intelligence',
    detail: 'Class of 2025',
  },
]

const CandidatesAlumni = () => (
  <section className="bg-gradient-to-tr from-neutral-950 to-neutral-800 px-6 py-20">
    <div className="mx-auto max-w-6xl">
      <h2 className="section-title mb-4 text-center">Where our alumni are</h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-gray-300">
        What a few of them say about their time on the team.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {alumni.map((a) => (
          <figure key={a.role} className="flex flex-col justify-between rounded-xl bg-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(10,56,239,0.35)]">
            <blockquote className="text-lg leading-relaxed text-gray-200">
              <i className="fas fa-quote-left mr-2 text-bright" />
              {a.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-gray-700 pt-4">
              <span className="block font-anton text-lg uppercase tracking-wide">{a.name}</span>
              <span className="block text-sm text-bright">{a.role}</span>
              <span className="block text-sm text-gray-500">{a.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
)

export default CandidatesAlumni
