// @flow
import React from 'react'
import donate from '../../../images/supportUs/donate.jpg'
import sponsorship from '../../../images/supportUs/sponsorship.jpg'
import gifts from '../../../images/supportUs/gifts.jpg'

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
  {
    title: ['Patrocinio', 'Sponsorship'],
    description: ['¡Ayúdanos a desarrollar robots y competir, mostrando el nombre de tu empresa en nuestras camisas!',
      'Help us develop robots and compete by collaborating with us, showing your company name on our shirts!'],
    img: sponsorship,
    link: '',
  },
  {
    title: ['Especie', 'In-Kind'],
    description: ['Desde boletos de avión hasta materiales mecánicos, estos bienes y servicios son vitales para desarrollar nuevas tecnologías.',
      'From airline tickets to mechanical materials, these goods and services are vital for developing new technologies.'],
    img: gifts,
    link: '',
  },
]

const button_description = ['Ver paquetes', 'See packages']

const scrollToPackages = () => {
  const el = document.getElementById('sponsor-packages')
  if (el !== null) el.scrollIntoView({ behavior: 'smooth' })
}

function SupportUsTypes({ language }: Props) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
        {supportUsTypes.map((type, index) => (
          <button
            key={type.title[1]}
            type="button"
            onClick={() => (index === 0 ? window.open(type.link) : scrollToPackages())}
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
      <div className="mt-12 text-center">
        <button type="button" onClick={scrollToPackages} className="rb-btn-outline">
          {button_description[language]}
          <i className="fas fa-angle-down ml-2" />
        </button>
      </div>
    </section>
  )
}

export default SupportUsTypes
