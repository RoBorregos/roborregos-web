// @flow
import React from 'react'
import CandidatesCarousel from './CandidatesCarousel/CandidatesCarousel'
import Roles from './Roles/Roles'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'
import CandidatesVideo from './CandidatesVideo/CandidatesVideo'
import CandidatesClasses from './CandidatesClasses/CandidatesClasses'
import CandidatesLinks from './CandidatesLinks/CandidatesLinks'
import CandidatesProcess from './CandidatesProcess/CandidatesProcess'
import CandidatesAlumni from './CandidatesAlumni/CandidatesAlumni'

function Candidates({ language }: { language: number }) {
  document.title = 'RoBorregos | Candidates'
  const spanish = language === 0
  const headerTitle = spanish ? 'Candidates' : 'Candidates'
  const headerMainText = [spanish ? 'Es el programa anual de reclutamiento de RoBorregos, donde estudiantes de todas las carreras y semestres vienen a aprender y desarrollar robótica.' : "Is RoBorregos' annual recruiting program where students from all majors and semesters come to learn and develop robotics."]
  const headerSubText = [spanish ? '¿Eres candidato?' : 'Are you a candidate?']
  return (
    <>
      <HeaderBanner
        title={headerTitle}
        mainText={headerMainText}
        subText={headerSubText}
      />
      <CandidatesVideo />
      <CandidatesProcess />
      <CandidatesCarousel />
      <Roles />
      <CandidatesAlumni />
      <CandidatesClasses />
      <CandidatesLinks />
    </>
  )
}

export default Candidates
