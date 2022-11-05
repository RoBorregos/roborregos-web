// @flow

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react'
import Carousel from 'react-material-ui-carousel'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import useWindowSize from '../../../hooks/useWindowSize'
import { SMALL_WIDTH } from '../../../constants'
import HighPerformanceTeam from '../../../images/about/carousel/High-Performance.jpg'
import SocialProjects from '../../../images/about/carousel/Social-Projects.jpg'
import Events from '../../../images/about/carousel/Events.jpg'
import StudentCommunity from '../../../images/about/carousel/Student-Community.jpg'

import './AboutCarousel.css'

const images = [
  {
    title: 'High-Performance Team',
    subtitle: "We participate in different national and international competitions for autonomous robots such as Mexico's TMR (Torneo Mexicano de Robótica), RoboCup, and IEEE LARC (Latin American Robotics Competition). As a team, we want to demonstrate the potential of Mexico in the development and innovation of technology.",
    img: HighPerformanceTeam,
  },

  {
    title: 'Social Projects',
    subtitle: 'We like to share everything we’ve learned with the community, giving free classes, workshops and participating in webinars where we can talk and teach about all the technologies we’ve used and all the experiences we’ve had that inspire us.',
    img: SocialProjects,
  },

  {
    title: 'Events & Outreach',
    subtitle: 'We participate in congresses and events such as INCMty, Conexión Tec, The International Congress of Mechatronics - Automatization and Technology, Semana i and many more.',
    img: Events,
  },

  {
    title: 'Student Community',
    subtitle: 'To reach our community, we give free workshops about useful technologies such as: ROS, Git and Machine Learning, as well as our annual biggest event: Candidates, where the team gives weekly classes of basic programming, mechanics and electronics for anyone in the university interested, and organize a robotics tournament to get new members',
    img: StudentCommunity,
  },
]

const slidesFullView = images.map((image) => (
  <div className="full-size-slide">
    <div className="full-size-slide__text-container">
      <h1>{image.title}</h1>
      <p>{image.subtitle}</p>
    </div>
    <div className="full-size-slide__image" style={{ backgroundImage: `url(${image.img})` }} />
  </div>
))
const slidesSmallView = images.map((image) => (
  <div className="small-size-slide" style={{ backgroundImage: `url(${image.img})` }}>
    <h1>{image.title}</h1>
    <p>{image.subtitle}</p>
  </div>
))

const arrowStyles = {
  root: {
    fontSize: '5vh !important',
    color: 'white !important',
  },
}
const ArrowForward = withStyles(arrowStyles)(ArrowForwardIcon)
const ArrowBack = withStyles(arrowStyles)(ArrowBackIcon)

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent !important',
    opacity: '1 !important',
    color: 'white !important',
    margin: 0,
  },
})

function AboutCarousel() {
  const { width } = useWindowSize()
  const classes = useStyles()

  return (
    <Carousel
      className="about-carousel"
      navButtonsAlwaysVisible
      navButtonsProps={{ className: classes.root }}
      autoPlay={false}
      indicatorContainerProps={{
        style: {
          display: 'none',
        },
      }}
      NextIcon={<ArrowForward />}
      PrevIcon={<ArrowBack />}
    >
      { (width > SMALL_WIDTH
        ? slidesFullView.map((element) => element)
        : slidesSmallView.map((element) => element)) }
    </Carousel>
  )
}

export default AboutCarousel
