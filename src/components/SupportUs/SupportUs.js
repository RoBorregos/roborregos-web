// @flow
import React, { useState } from 'react'
import SupportUsCompetitions from './SupportUsCompetitions/SupportUsCompetitions'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'
import SupportUsTypes from './SupportUsTypes/SupportUsTypes'
import SendEmail from './SendEmail/SendEmail'

const Contact = () => {
  const headerTitle = ['Apóyanos', 'Support us']
  const headerMainText = [['¿Te gustaría apoyarnos? ¡Colabora con nosotros!'], ['Would you like to support RoBorregos? Let’s collaborate!']]
  const headerSubText = [['Ver más'], ['Learn More']]
  const buttonText = ['Contáctanos', 'Contact Us!']

  document.title = 'RoBorregos | Support us'

  const [language, setLanguage] = useState(1)

  return (
    <>
      <HeaderBanner
        title={headerTitle[language]}
        mainText={headerMainText[language]}
        subText={headerSubText[language]}
        additionalButton={{
          text: buttonText[language],
          bgColor: '#000000',
          borderColor: '#CB6CE6',
          onClick() {
            const forms = document.getElementById('send-email')
            if (forms !== null) {
              forms.scrollIntoView({ block: 'end' })
            }
          },
        }}
      />
      <button
        type="button"
        onClick={() => setLanguage(!language ? 1 : 0)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-roboblue px-4 py-3 font-anton tracking-wide shadow-lg transition hover:scale-105"
      >
        ES/EN
      </button>
      <SupportUsTypes language={language} />
      <SendEmail language={language} />
      <SupportUsCompetitions language={language} />
    </>
  )
}

export default Contact
