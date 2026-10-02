import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import { Link } from 'react-router-dom'
import membersData from '../../data/members.json'
import {
  PageHead, Icons, memberImg, useDocumentTitle,
} from '../lib'
import './Members.css'

const AREAS = [
  { id: 'software', label: 'Software', test: /software|program|vision|hri|navigation|web|control/i },
  { id: 'mechanical', label: 'Mechanical', test: /mechanic/i },
  { id: 'electronics', label: 'Electronics', test: /electronic|infrared/i },
  { id: 'ops', label: 'Operations', test: /logistic|sponsor|communication|image|financ|president|director|network|industrial|comitee|leadership/i },
]

const fullName = (m) => `${m.name} ${m.lastname}`.trim()

function matches(member, query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return true
  const haystack = `${member.name} ${member.lastname} ${member.role} ${member.tags || ''} ${member.subtitle || ''}`
    .toLowerCase()
    .split(/[\s,&/|()]+/)
  return words.every((w) => haystack.some((h) => h.startsWith(w)))
}

const setNameParam = (member) => {
  const url = new URL(window.location.href)
  if (member) url.searchParams.set('name', fullName(member))
  else url.searchParams.delete('name')
  window.history.replaceState(null, '', url.toString())
}

function Profile({
  member, onClose, onPrev, onNext, position,
}) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const legacy = member.status === 'inactive'
  const tags = (member.tags || '').split(',').map((t) => t.trim()).filter(Boolean)

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label={fullName(member)} onClick={onClose}>
      <div className="sheet__panel profile" onClick={(e) => e.stopPropagation()}>
        <div className="photo profile__img">
          <img key={member.id} src={memberImg(member.id)} alt={fullName(member)} />
        </div>
        <div className="profile__body">
          <div className="profile__top">
            <span className="small">{`${legacy ? 'Legacy member' : 'Active member'}, joined ${member.class}`}</span>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close profile"><Icons.Close /></button>
          </div>
          <div className="profile__id">
            <h2 className="h2">{fullName(member)}</h2>
            {member.role && <p className="profile__role">{member.role}</p>}
            {member.subtitle && <p className="body-2">{member.subtitle}</p>}
          </div>
          {member.description && <p className="body-2 profile__desc">{member.description}</p>}
          {tags.length > 0 && (
            <ul className="profile__tags" aria-label="Skills">
              {tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          )}
          <div className="profile__links">
            {member.github && (
              <a className="btn btn--sm" href={member.github} target="_blank" rel="noreferrer">
                <Icons.GitHub width={16} height={16} />
                {member.github_user || 'GitHub'}
              </a>
            )}
            {member.linkedin && (
              <a className="btn btn--sm" href={member.linkedin} target="_blank" rel="noreferrer">
                <Icons.LinkedIn width={16} height={16} />
                LinkedIn
              </a>
            )}
          </div>
          <div className="profile__nav">
            <button type="button" className="icon-btn" onClick={onPrev} aria-label="Previous member"><Icons.ChevronLeft /></button>
            <span className="small">{position}</span>
            <button type="button" className="icon-btn" onClick={onNext} aria-label="Next member"><Icons.ChevronRight /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Members() {
  useDocumentTitle('Team')
  const { members } = membersData
  const [status, setStatus] = useState('active')
  const [area, setArea] = useState('all')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)

  const roster = useMemo(() => members.filter((m) => (
    status === 'all' || (status === 'active' ? m.status !== 'inactive' : m.status === 'inactive')
  )), [members, status])

  // Filters isolate rather than hide: non-matching members dim but keep their tile.
  const isMatch = useCallback((m) => (
    (area === 'all' || AREAS.find((a) => a.id === area).test.test(m.role)) && matches(m, query)
  ), [area, query])
  const matchCount = roster.filter(isMatch).length
  const filtering = area !== 'all' || query.trim() !== ''
  // Arrow navigation in the profile walks the members that match.
  const walk = filtering ? roster.filter(isMatch) : roster

  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get('name')
    if (!name) return
    const target = members.find((m) => fullName(m).toLowerCase() === name.toLowerCase())
      || members.find((m) => matches(m, name))
    if (target) {
      setStatus(target.status === 'inactive' ? 'legacy' : 'active')
      setOpenId(target.id)
    }
  }, [members])

  const openIndex = walk.findIndex((m) => m.id === openId)
  const open = openIndex >= 0 ? walk[openIndex] : members.find((m) => m.id === openId)

  const show = useCallback((member) => {
    setOpenId(member ? member.id : null)
    setNameParam(member)
  }, [])
  const step = useCallback((dir) => {
    if (!walk.length) return
    const from = openIndex < 0 ? 0 : openIndex
    show(walk[(from + dir + walk.length) % walk.length])
  }, [openIndex, walk, show])
  const close = useCallback(() => show(null), [show])
  const prev = useCallback(() => step(-1), [step])
  const next = useCallback(() => step(1), [step])

  const counts = {
    active: members.filter((m) => m.status !== 'inactive').length,
    legacy: members.filter((m) => m.status === 'inactive').length,
    all: members.length,
  }

  return (
    <main>
      <PageHead
        title="The roster."
        lead="Students in software, electronics, mechanics and operations, plus every generation that came before them. Select anyone to read their profile."
      />

      <section className="section roster-section">
        <div className="field">
          <div className="controls">
            <div className="switch" role="group" aria-label="Generation">
              {[['active', 'Active'], ['legacy', 'Legacy'], ['all', 'Everyone']].map(([id, label]) => (
                <button key={id} type="button" aria-pressed={status === id} onClick={() => setStatus(id)}>
                  {`${label} ${counts[id]}`}
                </button>
              ))}
            </div>
            <label className="search">
              <Icons.Search />
              <span className="sr-only">Search the roster</span>
              <input
                type="search"
                placeholder="Search by name or skill, like vision or ROS"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="controls__areas" role="group" aria-label="Area">
              {AREAS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="chip"
                  aria-pressed={area === a.id}
                  onClick={() => setArea(area === a.id ? 'all' : a.id)}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <p className="small controls__count" aria-live="polite">
              {filtering ? `${matchCount} of ${roster.length} match` : `${roster.length} members`}
            </p>
          </div>

          <ul className="roster">
            {roster.map((m) => {
              const hit = isMatch(m)
              return (
                <li key={m.id} className={`person ${filtering && !hit ? 'is-dim' : ''}`}>
                  <button type="button" onClick={() => show(m)} tabIndex={filtering && !hit ? -1 : 0}>
                    <span className="photo person__img"><img src={memberImg(m.id)} alt="" loading="lazy" /></span>
                    <span className="person__name">{fullName(m)}</span>
                    <span className="person__role">{m.subtitle || m.role || 'Member'}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          {filtering && matchCount === 0 && (
            <p className="lead roster__empty">No one matches that search. Try a skill like “ROS”, or clear the area filter.</p>
          )}
        </div>
      </section>

      <section className="join-row">
        <div className="field join-row__inner">
          <h2 className="h2">The next roster starts at Candidates.</h2>
          <Link to="/candidates" className="checkpoint">
            Apply to Candidates
            <Icons.Arrow />
          </Link>
        </div>
      </section>

      {open && (
        <Profile
          member={open}
          position={openIndex >= 0 ? `${openIndex + 1} of ${walk.length}` : ''}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </main>
  )
}
