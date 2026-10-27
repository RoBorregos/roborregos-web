// @flow
import React from 'react'
import HomeHeader from './HomeHeader/HomeHeader'
import HomeMiniInformation from './HomeMiniInformation/HomeMiniInformation'
import HomeSponsors from './HomeSponsors/HomeSponsors'
import HomeMisionVision from './HomeMisionVision/HomeMisionVision'
import sponsorsData from '../../data/sponsors.json'
import HomeCarousel from './HomeCarousel/HomeCarousel'

const Home = ({ language }: { language: number }) => {
  document.title = 'RoBorregos | Home'

  return (
    <>
      <HomeHeader language={language} />
      <HomeMiniInformation />
      <HomeMisionVision />
      <HomeCarousel />
      <HomeSponsors sponsors={sponsorsData.sponsors} />
    </>
  )
}

export default Home
