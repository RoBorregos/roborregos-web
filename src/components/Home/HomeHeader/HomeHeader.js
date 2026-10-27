// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import header from '../../../images/header.png'
import team from '../../../images/home/team_2026.jpg'

const ReactRotatingText = require('react-rotating-text')

const HomeHeader = ({ language }: { language: number }) => {
  const spanish = language === 0
  return (
  <header className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 text-center">
    <img src={team} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" />
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy blur-[120px]" />

    <div className="relative z-10 flex flex-col items-center gap-8">
      <img src={header} alt="RoBorregos" className="w-[70vw] max-w-xl" />
      <h1 className="font-jersey text-5xl text-white md:text-7xl">
        We
        <span className="text-bright">
          <ReactRotatingText
            items={[' create', ' build', ' design', ' code', ' connect', ' compete', ' learn', ' teach']}
            pause={2500}
            typingInterval={70}
            emptyPause={20}
          />
        </span>
      </h1>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link to="/candidates" className="rb-btn px-8 py-3 text-lg">{spanish ? 'Únete a Candidates' : 'Join Candidates'}</Link>
        <Link to="/support-us" className="rb-btn-outline px-8 py-3 text-lg">{spanish ? 'Apóyanos' : 'Support us'}</Link>
      </div>
    </div>
  </header>
  )
}

export default HomeHeader
