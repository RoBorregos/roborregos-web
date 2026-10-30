// @flow
import React from 'react'
import roborregosLogo from '../../../images/white_logo.png'
import facebookLogo from '../../../images/candidates/facebook-logo.png'
import instagramLogo from '../../../images/candidates/instagram-logo.png'

function CandidatesLinks() {
  return (
    <section className="px-6 py-20 text-center">
      <h2 className="section-title mb-12">Message Us!</h2>
      <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-3">
        <a href="https://www.facebook.com/RoBorregos/" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
          <img className="h-24 transition duration-300 group-hover:scale-110" src={facebookLogo} alt="facebook-logo" />
          <span className="font-anton text-xl uppercase tracking-wide">RoBorregos</span>
        </a>
        <img className="mx-auto h-24 opacity-90" src={roborregosLogo} alt="RoBorregos-logo" />
        <a href="https://www.instagram.com/roborregos/" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3">
          <img className="h-24 transition duration-300 group-hover:scale-110" src={instagramLogo} alt="instagram-logo" />
          <span className="font-anton text-xl uppercase tracking-wide">@roborregos</span>
        </a>
      </div>
    </section>
  )
}

export default CandidatesLinks
