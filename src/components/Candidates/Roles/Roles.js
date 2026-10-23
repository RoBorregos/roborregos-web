// @flow
import React from 'react'
import CandidatesOpenPositions from './CandidatesOpenPositions/CandidatesOpenPositions'
import positionsData from '../../../data/positions.json'

const Roles = () => (
  <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 px-6 py-20">
    <h2 className="section-title mb-12 text-center">Roles</h2>
    <CandidatesOpenPositions positionsData={positionsData} />
  </section>
)

export default Roles
