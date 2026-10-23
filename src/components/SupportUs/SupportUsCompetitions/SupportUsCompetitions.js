import React from 'react'
import placeholder from '../../../images/placeholder-rectangle.png'
import competitionsData from '../../../data/competitions.json'

type CompetitionType = {
  name: string,
  img: string,
  url: string
};

type Props = {
  language: number
};

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../images/${imgPath}`)
  } catch (err) {
    return placeholder
  }
}

const description = ['Todo el apoyo va para el desarrollo de los siguientes proyectos:', 'Our sponsors team is part of our development in the following projects:']

const { competitions } = competitionsData

function ContactCompetitions({ language }: Props) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="section-subtitle mb-12 text-center normal-case">{description[language]}</p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {competitions.map((competition: CompetitionType) => (
            <a key={competition.name} href={competition.url} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3 text-center">
              <img src={tryRequire(competition.img)} alt={competition.name} className="h-28 w-28 rounded-full bg-white object-contain p-3 transition duration-300 group-hover:scale-110" />
              <span className="text-sm text-gray-300 group-hover:text-roboblue">{competition.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactCompetitions
