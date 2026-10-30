// @flow
import React from 'react'
import SupportUsCompetitions from './SupportUsCompetitions/SupportUsCompetitions'
import HeaderBanner from '../Shared/HeaderBanner/HeaderBanner'
import SupportUsTypes from './SupportUsTypes/SupportUsTypes'
import SendEmail from './SendEmail/SendEmail'

type Props = {
  language: number,
};

const Contact = ({ language }: Props) => {
  const headerTitle = ['Apóyanos', 'Support us']
  const headerMainText = [['¿Te gustaría apoyarnos? ¡Colabora con nosotros!'], ['Would you like to support RoBorregos? Let’s collaborate!']]
  const headerSubText = [['Ver más'], ['Learn More']]
  const buttonText = ['Contáctanos', 'Contact Us!']

  document.title = 'RoBorregos | Support us'

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
      <SupportUsTypes language={language} />
      <SendEmail language={language} />
      <SupportUsCompetitions language={language} />
    </>
  )
}

export default Contact
