// @flow
import React from 'react'
import AboutTimeline from './AboutTimeline/AboutTimeline'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'
import Carousel from './AboutCarousel/carousel'
import RoborregosVideo from './VideoPlayer/Responsive-Video-Player'
import AboutHistoryReel from './AboutHistoryReel/AboutHistoryReel'

const About = ({ language }: { language: number }) => {
  const spanish = language === 0
  const headerTitle = spanish ? 'Nosotros' : 'About us'
  const headerMainText = spanish
    ? ['En 2015, cuatro estudiantes compitieron en el TMR y lograron llegar a la competencia internacional.', 'Motivados, fundaron RoBorregos para compartir conocimiento y experiencias entre generaciones.']
    : ['In 2015, four students competed in the TMR, reaching a pass to the international; There, they met people from other countries and noticed the potential that Mexico could have.', 'Motivated, they started RoBorregos, intending to share knowledge and experiences through generations.']
  const headerSubText = [spanish ? 'Nuestro recorrido' : 'Our journey']
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
      <AboutTimeline language={language} />
      <AboutHistoryReel language={language} />
    </>
  )
}

export default About
