// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/white_logo.png'
import routesData from '../../data/routes.json'

const socials = [
  { name: 'Facebook', link: 'https://www.facebook.com/RoBorregos/', icon: 'fab fa-facebook' },
  { name: 'Instagram', link: 'https://www.instagram.com/roborregos/', icon: 'fab fa-instagram' },
  { name: 'YouTube', link: 'https://www.youtube.com/channel/UCeSvAh96bXA3CcRGc4u7_oA', icon: 'fab fa-youtube' },
  { name: 'GitHub', link: 'https://github.com/RoBorregos/', icon: 'fab fa-github' },
  { name: 'LinkedIn', link: 'https://mx.linkedin.com/company/roborregos', icon: 'fab fa-linkedin' },
]

const Footer = () => (
  <>
  <section className="bg-gradient-to-r from-navy via-roboblue/70 to-navy px-6 py-14 text-center">
    <h2 className="font-jersey text-4xl text-white md:text-6xl">Build the next robot with us</h2>
    <p className="mx-auto mt-3 max-w-xl text-gray-200">Candidates opens every year to students from any major and semester.</p>
    <Link to="/candidates" className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-black transition duration-300 hover:scale-105">Join the Team</Link>
  </section>
  <footer className="bg-gradient-to-tr from-neutral-950 to-neutral-800 px-6 py-12 font-archivo text-white lg:px-12">
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
      <div className="flex flex-col items-start gap-4">
        <img src={logo} alt="RoBorregos" className="h-24 w-auto" />
        <p className="text-sm text-gray-400">Tecnológico de Monterrey, Campus Monterrey</p>
      </div>

      <div>
        <h3 className="mb-4 font-anton text-2xl uppercase tracking-wide">Sitemap</h3>
        <ul className="grid grid-cols-2 gap-2">
          {routesData.routes.map((route) => (
            <li key={route.path}>
              <Link to={route.path} className="text-gray-300 transition duration-300 hover:text-bright">
                {route.legend}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 md:items-end">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="rb-btn-outline text-sm"
        >
          Back to top ↑
        </button>
        <div className="flex gap-5 text-3xl">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="text-gray-300 transition duration-300 hover:text-rbrgs"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
        <span className="text-sm text-gray-500">©2026 RoBorregos</span>
      </div>
    </div>
  </footer>
  </>
)

export default Footer
