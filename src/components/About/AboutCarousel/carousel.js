import React, { useState } from 'react'
import HighPerformanceTeam from '../../../images/about/carousel/High-Performance.jpg'
import SocialProjects from '../../../images/about/carousel/Social-Projects.jpg'
import Events from '../../../images/about/carousel/Events.jpg'
import StudentCommunity from '../../../images/about/carousel/Student-Community.jpg'

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

function Carousel() {
  const [currImg, setCurrImg] = useState(0)
  const go = (delta) => setCurrImg((c) => (c + delta + images.length) % images.length)
  const item = images[currImg]

  return (
    <section className="grid min-h-[70vh] md:grid-cols-2">
      <div className="flex flex-col justify-center bg-gradient-to-tr from-neutral-950 to-neutral-800 px-8 py-12 md:px-16">
        <h2 className="section-title mb-6">{item.title}</h2>
        <p className="text-lg leading-relaxed text-gray-300">{item.subtitle}</p>
        <div className="mt-8 flex items-center gap-4">
          <button type="button" aria-label="Previous" onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-steel transition hover:bg-roboblue">
            <i className="fas fa-chevron-left" />
          </button>
          <button type="button" aria-label="Next" onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-steel transition hover:bg-roboblue">
            <i className="fas fa-chevron-right" />
          </button>
          <span className="font-anton text-gray-500">{currImg + 1} / {images.length}</span>
        </div>
      </div>
      <div className="min-h-[40vh] bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${item.img})` }} />
    </section>
  )
}

export default Carousel
