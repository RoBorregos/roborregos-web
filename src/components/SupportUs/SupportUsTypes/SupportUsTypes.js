// @flow
import React from 'react'
import donate from '../../../images/supportUs/donate.jpg'

type Props = {
  language: number
};

const supportUsTypes = [
  {
    title: ['Donación', 'Donate'],
    description: ['¡Dando un monto anónimamente puedes proporcionarnos los recursos para desarrollar tecnología e ir a competir! ¡Da click aquí!',
      'By donating anonymously you can provide us with the necessary resources to develop technology and compete! Click here!'],
    img: donate,
    link: 'https://catalogodeservicios.itesm.mx/',
  },
]

function SupportUsTypes({ language }: Props) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-md gap-8">
        {supportUsTypes.map((type) => (
          <button
            key={type.title[1]}
            type="button"
            onClick={() => window.open(type.link)}
            className="group overflow-hidden rounded-xl bg-card text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(10,56,239,0.4)]"
          >
            <img src={type.img} alt={type.title[1]} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="p-6">
              <h3 className="mb-3 font-jersey text-4xl text-bright">{type.title[language]}</h3>
              <p className="text-gray-300">{type.description[language]}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default SupportUsTypes
