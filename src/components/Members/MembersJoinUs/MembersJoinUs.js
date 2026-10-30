import React from 'react'
import { Link } from 'react-router-dom'

const MembersJoinUs = () => (
  <section className="relative overflow-hidden bg-gradient-to-r from-navy to-black px-6 py-20 text-center" data-testid="members-join-us">
    <h2 className="section-title mb-8">Want to be part of the team?</h2>
    <Link to="/candidates" data-testid="members-join-us-button" className="rb-btn text-lg">
      Join the Team
    </Link>
  </section>
)

export default MembersJoinUs
