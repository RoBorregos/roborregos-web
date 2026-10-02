// Shared pieces: image resolution, page heading, toast, icons, session helpers.
import React, { useEffect, useState } from 'react'
import placeholder from '../images/placeholder-rectangle.png'

/* ------------------------------ Images ------------------------------ */
// webpack needs a literal prefix per folder, so each folder gets its own resolver.
const safe = (fn) => {
  try {
    const mod = fn()
    return mod.default || mod
  } catch (err) {
    return placeholder
  }
}
export const memberImg = (id) => safe(() => require(`../images/members/${id}.jpg`))
export const projectImg = (name) => safe(() => require(`../images/projects/${name}.jpg`))
export const timelineImg = (name) => safe(() => require(`../images/about/timeline/${name}.jpg`))
export const sponsorImg = (file) => safe(() => require(`../images/sponsors/${file}`))
export const galleryImg = (n) => safe(() => require(`../images/home/carousel/${n}.jpg`))
export const roleImg = (file) => safe(() => require(`../images/candidates/roles/${file}`))
export const anyImg = (path) => safe(() => require(`../images/${path}`))

/* ------------------------------ Session ------------------------------ */
// sessionStorage can throw (private mode, blocked storage); every access is guarded.
export const session = {
  get(key, fallback) {
    try {
      const raw = window.sessionStorage.getItem(key)
      return raw === null ? fallback : JSON.parse(raw)
    } catch (err) {
      return fallback
    }
  },
  set(key, value) {
    try { window.sessionStorage.setItem(key, JSON.stringify(value)) } catch (err) { /* ignore */ }
  },
}

export function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · RoBorregos` : 'RoBorregos · Robotics team of Tec de Monterrey'
  }, [title])
}

export const scrollToId = (id) => {
  const node = document.getElementById(id)
  if (!node) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - 96, behavior: reduce ? 'auto' : 'smooth' })
}

/* ------------------------------ Layout pieces ------------------------------ */
export function PageHead({ title, lead, children }) {
  return (
    <header className="page-head">
      <div className="field seams page-head__inner">
        <h1 className="display">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children && <div className="page-head__actions">{children}</div>}
      </div>
    </header>
  )
}

export function Toast({ message, tone = 'success', onClose }) {
  useEffect(() => {
    if (!message) return undefined
    const t = setTimeout(onClose, 6000)
    return () => clearTimeout(t)
  }, [message, onClose])
  if (!message) return null
  return (
    <div className="toast" role="status">
      <span className="toast__mark" style={{ background: tone === 'success' ? 'var(--silver)' : 'var(--victim)' }} />
      {message}
    </div>
  )
}

/* ------------------------------ Icons ------------------------------ */
const svg = (path, { fill = false, size = 20 } = {}) => function Icon(props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      {...props}
    >
      {path}
    </svg>
  )
}

export const Icons = {
  Arrow: svg(<path d="M4 12h15M13 6l6 6-6 6" />, { size: 18 }),
  ArrowOut: svg(<path d="M7 17 17 7M8 7h9v9" />, { size: 16 }),
  Down: svg(<path d="M12 4v15M6 13l6 6 6-6" />, { size: 18 }),
  ChevronLeft: svg(<path d="m15 18-6-6 6-6" />),
  ChevronRight: svg(<path d="m9 18 6-6-6-6" />),
  Close: svg(<path d="M18 6 6 18M6 6l12 12" />),
  Search: svg(<><path d="M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15z" /><path d="m21 21-5.2-5.2" /></>),
  Map: svg(<><path d="M3 3h18v18H3z" /><path d="M9 3v12M15 9v12M3 9h6M15 15h6" /></>),
  Check: svg(<path d="m5 12 5 5 9-10" />, { size: 18 }),
  GitHub: svg(<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />, { fill: true, size: 18 }),
  LinkedIn: svg(<path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />, { fill: true, size: 18 }),
  Instagram: svg(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></>, { size: 18 }),
  YouTube: svg(<path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z" />, { fill: true, size: 18 }),
  Facebook: svg(<path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z" />, { fill: true, size: 18 }),
}

export const socials = [
  { name: 'Instagram', handle: '@roborregos', href: 'https://www.instagram.com/roborregos/', Icon: Icons.Instagram },
  { name: 'GitHub', handle: 'RoBorregos', href: 'https://github.com/RoBorregos/', Icon: Icons.GitHub },
  { name: 'YouTube', handle: 'RoBorregos', href: 'https://www.youtube.com/channel/UCeSvAh96bXA3CcRGc4u7_oA', Icon: Icons.YouTube },
  { name: 'LinkedIn', handle: 'roborregos', href: 'https://mx.linkedin.com/company/roborregos', Icon: Icons.LinkedIn },
  { name: 'Facebook', handle: 'RoBorregos', href: 'https://www.facebook.com/RoBorregos/', Icon: Icons.Facebook },
]
