import React, { useState } from 'react'
import sponsorsData from '../../data/sponsors.json'
import competitionsData from '../../data/competitions.json'
import donate from '../../images/projects/larc_open.jpg'
import sponsorship from '../../images/about/carousel/Events.jpg'
import gifts from '../../images/about/carousel/High-Performance.jpg'
import {
  Icons, anyImg, scrollToId, sponsorImg, useDocumentTitle,
} from '../lib'
import { ContactForm } from '../Forms'
import './SupportUs.css'

const COPY = {
  en: {
    title: 'Fund the next robot.',
    lead: 'Every robot we build and every trip to an international competition is paid for by people and companies who back student-built technology. Here is how you can help.',
    contact: 'Talk to the sponsorship team',
    packagesCta: 'Compare packages',
    waysTitle: 'Three ways to support the team',
    ways: [
      { title: 'Donate', text: 'Give any amount through the Tec services catalog. Donations pay for parts, tools and competition fees.', cta: 'Donate through Tec' },
      { title: 'Sponsor', text: 'Your brand on our robots, shirts and channels for the season, in one of three packages.', cta: 'Compare packages' },
      { title: 'Give in kind', text: 'Flights, machining, electronics or materials. Goods and services go straight into the robots.', cta: 'Offer goods or services' },
    ],
    pkgTitle: 'Sponsorship packages',
    pkgLead: 'Each package covers one season. Pick one and we will send the details.',
    pkgCta: (name) => `Ask about ${name}`,
    projTitle: 'What your support funds',
    projLead: 'Sponsorship goes to these projects and competition teams.',
    supportersTitle: 'Current supporters',
    formTitle: 'Talk to the sponsorship team',
    formLead: 'Tell us how you would like to help and we will reply by email.',
  },
  es: {
    title: 'Financia el próximo robot.',
    lead: 'Cada robot que construimos y cada viaje a una competencia internacional lo pagan personas y empresas que apoyan la tecnología hecha por estudiantes. Así puedes ayudar.',
    contact: 'Habla con el equipo de patrocinios',
    packagesCta: 'Comparar paquetes',
    waysTitle: 'Tres formas de apoyar al equipo',
    ways: [
      { title: 'Donar', text: 'Dona cualquier monto a través del catálogo de servicios del Tec. Las donaciones pagan piezas, herramientas e inscripciones.', cta: 'Donar a través del Tec' },
      { title: 'Patrocinar', text: 'Tu marca en nuestros robots, playeras y redes durante la temporada, en uno de tres paquetes.', cta: 'Comparar paquetes' },
      { title: 'Apoyar en especie', text: 'Vuelos, maquinado, electrónica o materiales. Los bienes y servicios van directo a los robots.', cta: 'Ofrecer bienes o servicios' },
    ],
    pkgTitle: 'Paquetes de patrocinio',
    pkgLead: 'Cada paquete cubre una temporada. Elige uno y te enviamos los detalles.',
    pkgCta: (name) => `Preguntar por ${name}`,
    projTitle: 'Lo que financia tu apoyo',
    projLead: 'Los patrocinios se destinan a estos proyectos y equipos de competencia.',
    supportersTitle: 'Quienes nos apoyan',
    formTitle: 'Habla con el equipo de patrocinios',
    formLead: 'Cuéntanos cómo te gustaría ayudar y te responderemos por correo.',
  },
}

const WAYS = [
  { img: donate, action: () => window.open('https://catalogodeservicios.itesm.mx/', '_blank', 'noopener') },
  { img: sponsorship, action: () => scrollToId('packages') },
  { img: gifts, action: () => scrollToId('contact') },
]

export default function SupportUs() {
  const [lang, setLang] = useState('en')
  const t = COPY[lang]
  useDocumentTitle(lang === 'en' ? 'Support us' : 'Apóyanos')

  return (
    <main lang={lang}>
      <header className="page-head">
        <div className="field seams page-head__inner">
          <div className="switch support-lang" role="group" aria-label="Language / Idioma">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">English</button>
            <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')} lang="es">Español</button>
          </div>
          <h1 className="display">{t.title}</h1>
          <p className="lead">{t.lead}</p>
          <div className="page-head__actions">
            <button type="button" className="checkpoint" onClick={() => scrollToId('contact')}>
              {t.contact}
              <Icons.Down />
            </button>
            <button type="button" className="btn" onClick={() => scrollToId('packages')}>{t.packagesCta}</button>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="field">
          <div className="section-title"><h2 className="h2">{t.waysTitle}</h2></div>
          <ul className="ways">
            {t.ways.map((w, i) => (
              <li key={w.title} className="way">
                <div className="photo way__img"><img src={WAYS[i].img} alt="" loading="lazy" /></div>
                <h3 className="h3 way__title">{w.title}</h3>
                <p className="body-2 way__text">{w.text}</p>
                <button type="button" className="btn btn--sm" onClick={WAYS[i].action}>
                  {w.cta}
                  {i === 0 ? <Icons.ArrowOut /> : <Icons.Down />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="threshold" />

      <section className="section" id="packages">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">{t.pkgTitle}</h2>
            <p className="lead">{t.pkgLead}</p>
          </div>
          <div className="packages">
            {sponsorsData.packages.map((pkg) => (
              <section key={pkg.name} className="package" aria-labelledby={`pkg-${pkg.name}`}>
                <h3 id={`pkg-${pkg.name}`} className="package__name">{pkg.name}</h3>
                <ul className="package__list">
                  {pkg.benefits.map((b) => (
                    <li key={b.en}>
                      <Icons.Check />
                      <span>{b[lang]}</span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="btn btn--sm" onClick={() => scrollToId('contact')}>
                  {t.pkgCta(pkg.name)}
                </button>
              </section>
            ))}
          </div>
        </div>
      </section>

      <div className="threshold" />

      <section className="section">
        <div className="field">
          <div className="section-title">
            <h2 className="h2">{t.projTitle}</h2>
            <p className="lead">{t.projLead}</p>
          </div>
          <ul className="funds">
            {competitionsData.competitions.map((c) => (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noreferrer" className="funds__item">
                  <span className="photo funds__img"><img src={anyImg(c.img)} alt="" loading="lazy" /></span>
                  <span className="funds__name">{c.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="supporters">
            <h3 className="h3">{t.supportersTitle}</h3>
            <ul className="supporters__row">
              {sponsorsData.sponsors.map((s) => (
                <li key={s.name}>
                  <a href={s.link} target="_blank" rel="noreferrer"><img src={sponsorImg(s.img_path)} alt={s.name} loading="lazy" /></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="field contact__grid">
          <div className="contact__intro">
            <h2 className="h2">{t.formTitle}</h2>
            <p className="lead">{t.formLead}</p>
            <a href="mailto:teamroborregos@gmail.com" className="text-link">teamroborregos@gmail.com</a>
          </div>
          <div className="contact__form">
            <ContactForm lang={lang} />
          </div>
        </div>
      </section>
    </main>
  )
}
