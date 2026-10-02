// Site chrome: tile-strip navigation with the robot marker, the mobile field map,
// the footer and scroll restoration.
import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../images/header.png'
import { Icons, session, socials } from './lib'
import './Chrome.css'

export const routes = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/members', label: 'Team' },
  { path: '/candidates', label: 'Candidates' },
  { path: '/support-us', label: 'Support us' },
]

const routeIndex = (pathname) => {
  if (pathname === '/') return 0
  return routes.findIndex((r, i) => i > 0 && pathname.startsWith(r.path))
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Top-down robot: chassis, two wheels, blue heading wedge.
export function Robot({ heading = 0, className = '', style }) {
  return (
    <span className={`robot ${className}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 24 24" style={{ transform: `rotate(${heading}deg)` }}>
        <rect x="1" y="5" width="4" height="7" fill="#b9bdc3" />
        <rect x="1" y="14" width="4" height="7" fill="#b9bdc3" />
        <rect x="19" y="5" width="4" height="7" fill="#b9bdc3" />
        <rect x="19" y="14" width="4" height="7" fill="#b9bdc3" />
        <rect x="5.75" y="2.75" width="12.5" height="19.5" fill="#1a1c1f" stroke="currentColor" strokeWidth="1.5" />
        <rect x="7.5" y="4.5" width="9" height="3" fill="#1f4fd1" />
        <rect x="10" y="12" width="4" height="4" fill="currentColor" />
      </svg>
    </span>
  )
}

// Pages already explored this session stay mapped, like tiles the robot has visited.
function useVisited(index) {
  const [visited, setVisited] = useState(() => session.get('rb-visited', []))
  useEffect(() => {
    if (index < 0) return
    setVisited((prev) => {
      if (prev.includes(index)) return prev
      const next = [...prev, index]
      session.set('rb-visited', next)
      return next
    })
  }, [index])
  return visited
}

function TileStrip({ index, visited }) {
  const stripRef = useRef(null)
  const [pos, setPos] = useState(null)
  const [heading, setHeading] = useState(90)
  const prev = useRef(index)

  useLayoutEffect(() => {
    const strip = stripRef.current
    if (!strip || index < 0) { setPos(null); return undefined }
    const measure = () => {
      const cell = strip.children[index]
      if (cell) setPos(cell.offsetLeft + cell.offsetWidth / 2)
    }
    measure()
    if (prev.current !== index) setHeading(index > prev.current ? 90 : -90)
    prev.current = index
    window.addEventListener('resize', measure)
    if (document.fonts) document.fonts.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [index])

  return (
    <div className="strip">
      <ul className="strip__cells" ref={stripRef}>
        {routes.map((r, i) => (
          <li key={r.path}>
            <NavLink
              exact={r.path === '/'}
              to={r.path}
              className="strip__cell"
              activeClassName="is-here"
              aria-current={i === index ? 'page' : undefined}
            >
              {r.label}
              {visited.includes(i) && i !== index && <span className="strip__mapped" aria-hidden="true" />}
            </NavLink>
          </li>
        ))}
      </ul>
      {pos !== null && (
        <Robot className="strip__robot" heading={heading} style={{ transform: `translateX(${pos}px)` }} />
      )}
    </div>
  )
}

function FieldMap({ index, visited, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="map" role="dialog" aria-modal="true" aria-label="Site map">
      <ul className="map__tiles">
        {routes.map((r, i) => (
          <li key={r.path}>
            <Link to={r.path} className={`map__tile ${i === index ? 'is-here' : ''}`} onClick={onClose}>
              <span>{r.label}</span>
              {i === index && <Robot className="map__robot" />}
              {visited.includes(i) && i !== index && <span className="strip__mapped" aria-hidden="true" />}
            </Link>
          </li>
        ))}
      </ul>
      <div className="map__socials">
        {socials.map(({ name, href, Icon }) => (
          <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}><Icon /></a>
        ))}
      </div>
    </div>
  )
}

export function Nav() {
  const { pathname } = useLocation()
  const index = routeIndex(pathname)
  const visited = useVisited(index)
  const [mapOpen, setMapOpen] = useState(false)

  useEffect(() => { setMapOpen(false) }, [pathname])

  return (
    <nav className="nav" aria-label="Main">
      <div className="field nav__bar">
        <Link to="/" className="nav__brand" aria-label="RoBorregos home">
          <img src={logo} alt="" />
        </Link>
        <TileStrip index={index} visited={visited} />
        <button
          type="button"
          className="nav__map-btn"
          aria-expanded={mapOpen}
          onClick={() => setMapOpen(!mapOpen)}
        >
          {mapOpen ? <Icons.Close /> : <Icons.Map />}
          <span>{mapOpen ? 'Close' : 'Map'}</span>
        </button>
      </div>
      {mapOpen && <FieldMap index={index} visited={visited} onClose={() => setMapOpen(false)} />}
    </nav>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="field">
        <div className="footer__close">
          <h2 className="h2">Build the next robot with us.</h2>
          <div className="footer__actions">
            <Link to="/candidates" className="checkpoint">
              Apply to Candidates
              <Icons.Arrow />
            </Link>
            <Link to="/support-us" className="checkpoint">
              Become a sponsor
              <Icons.Arrow />
            </Link>
          </div>
        </div>
        <div className="footer__grid">
          <p className="footer__about">
            RoBorregos is the robotics representative team of Tecnológico de Monterrey,
            Campus Monterrey. Building, competing and teaching since 2015.
          </p>
          <ul className="footer__list" aria-label="Pages">
            {routes.map((r) => <li key={r.path}><Link to={r.path}>{r.label}</Link></li>)}
          </ul>
          <ul className="footer__list" aria-label="Social">
            {socials.map(({ name, href }) => (
              <li key={name}><a href={href} target="_blank" rel="noreferrer">{name}</a></li>
            ))}
          </ul>
          <ul className="footer__list" aria-label="Contact">
            <li><a href="mailto:teamroborregos@gmail.com">teamroborregos@gmail.com</a></li>
            <li>Monterrey, Nuevo León</li>
          </ul>
        </div>
        <p className="footer__legal">{`© ${year} RoBorregos`}</p>
      </div>
    </footer>
  )
}
