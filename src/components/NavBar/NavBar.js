// @flow
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../images/white_logo.png'
import sponsorLogo from '../../images/sponsors/LogoTec.png'

type RouteType = {
  path: string,
  legend: string,
  component: string,
};

type Props = {
  routes: Array<RouteType>,
};

const NavBar = ({ routes }: Props) => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path))

  return (
    <nav className="fixed top-0 z-50 w-screen bg-black/95 font-archivo backdrop-blur">
      <div className="flex h-16 items-center justify-between px-6 lg:px-12">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src={logo} alt="RoBorregos" className="h-9" />
        </Link>

        <ul className="hidden items-center gap-x-10 lg:flex">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`border-b-2 pb-1 text-sm uppercase tracking-widest transition duration-300 ${
                  isActive(route.path)
                    ? 'border-roboblue text-white'
                    : 'border-transparent text-gray-300 hover:text-white'
                }`}
              >
                {route.legend}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="http://www.noahsuzhou.com/"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 text-xs text-gray-400 lg:flex"
        >
          Powered by
          <img src={sponsorLogo} alt="Tec de Monterrey" className="h-6" />
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <ul className="flex flex-col border-t border-gray-800 bg-black px-6 pb-4 lg:hidden">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                onClick={() => setOpen(false)}
                className={`block py-3 text-sm uppercase tracking-widest ${
                  isActive(route.path) ? 'text-roboblue' : 'text-gray-300'
                }`}
              >
                {route.legend}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default NavBar
