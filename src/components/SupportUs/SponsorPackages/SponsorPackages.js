// @flow
import React from 'react'
import logo from '../../../images/white_logo.png'
import sponsorsData from '../../../data/sponsors.json'

type BenefitsType = {
  es: string,
  en: string
};

type PackageType = {
  name: string,
  benefits: Array<BenefitsType>
};

type Props = {
  language: string
};

const email_button = { es: '¡Envíanos un email!', en: 'Send us an email!' }

const SponsorPackages = ({ language }: Props) => {
  const scrollToMailForm = () => {
    const forms = document.getElementById('send-email')
    if (forms !== null) {
      forms.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  }
  return (
    <section id="sponsor-packages" className="bg-gradient-to-r from-neutral-900 to-neutral-950 px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sponsorsData.packages.map((pkg: PackageType) => (
          <div key={pkg.name} className="flex flex-col rounded-xl border border-steel/40 bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-roboblue hover:shadow-[0_0_30px_rgba(10,56,239,0.4)]">
            <h4 className="border-b border-gray-700 pb-4 text-center font-anton text-2xl uppercase tracking-wide text-roboblue">{pkg.name}</h4>
            <ul className="flex-1 space-y-3 py-6">
              {pkg.benefits.map((benefit: BenefitsType) => (
                <li key={benefit.en} className="flex gap-3 text-sm text-gray-300">
                  <i className="fas fa-check-circle mt-0.5 text-rbrgs" />
                  <span>{language === 'es' ? benefit.es : benefit.en}</span>
                </li>
              ))}
            </ul>
            <img src={logo} alt="Logo" className="mx-auto h-8 opacity-60" />
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button type="button" onClick={scrollToMailForm} className="rb-btn">
          {email_button[language]}
          <i className="fas fa-angle-down ml-2" />
        </button>
      </div>
    </section>
  )
}

export default SponsorPackages
