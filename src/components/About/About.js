// @flow
import React from 'react'
import AboutTimeline from './AboutTimeline/AboutTimeline'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'
import Carousel from './AboutCarousel/carousel'
import RoborregosVideo from './VideoPlayer/Responsive-Video-Player'

const About = () => {
  const headerTitle = 'About us'
  const headerMainText = ['In 2015, four students competed in the TMR, reaching a pass to the international; There, they met people from other countries and noticed the potential that Mexico could have.', 'Motivated, they started RoBorregos, intending to share knowledge and experiences through generations.']
  const headerSubText = ['Our journey']
  document.title = 'RoBorregos | About'
  return (
    <>
      <HeaderBanner
        title={headerTitle}
        mainText={headerMainText}
        subText={headerSubText}
      />
      <RoborregosVideo />
      <Carousel />
      <AboutTimeline />
    </>
  )
}

export default About
