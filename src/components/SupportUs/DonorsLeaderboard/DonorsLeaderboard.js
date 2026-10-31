// @flow
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Fade from '@material-ui/core/Fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faHeart, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import './DonorsLeaderboard.css'
import donorsData from '../../../data/donors.json'
import { getTopDonors } from '../../../scripts/apiScripts'

type MessageType = {
  es: string,
  en: string
};

type DonorType = {
  id: string,
  name: string,
  kind: string,
  anonymous: boolean,
  amount: number,
  donations_count: number,
  logo_url: ?string,
  message: ?MessageType
};

type Props = {
  language: number
};

const PODIUM_SIZE = 3
const BOARD_SIZE = 10

const section_title = ['Muro de donantes', 'Donors wall']
const section_subtitle = [
  'Quienes hicieron posible nuestro mes. ¡Gracias por impulsar cada robot!',
  'The people who made our month possible. Thank you for driving every robot!',
]
const anonymous_name = ['Donante anónimo', 'Anonymous donor']
const donations_label = [['donación', 'donaciones'], ['donation', 'donations']]
const total_label = ['Recaudado este mes', 'Raised this month']
const donors_label = ['Donantes', 'Donors']
const cta_label = ['Aparece en el muro', 'Get on the wall']
const podium_labels = [
  ['Donante del mes', 'Donor of the month'],
  ['Segundo lugar', 'Runner-up'],
  ['Tercer lugar', 'Third place'],
]

const months = [
  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'],
]

const donate_link = 'https://catalogodeservicios.itesm.mx/'

/**
Builds the initials shown inside the avatar when a donor has no logo.
*/
const getInitials = (name: string) => name
  .split(' ')
  .filter((word) => word.length)
  .slice(0, 2)
  .map((word) => word[0].toUpperCase())
  .join('')

function DonorsLeaderboard({ language }: Props) {
  const [board, setBoard] = useState(donorsData)

  useEffect(() => {
    let mounted = true
    const { year, month } = donorsData.period
    getTopDonors(year, month).then((response) => {
      if (mounted && response && response.status && response.data && response.data.donors) {
        setBoard(response.data)
      }
    }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const formatAmount = (amount: number) => new Intl.NumberFormat(
    language ? 'en-US' : 'es-MX',
    {
      style: 'currency',
      currency: board.currency,
      maximumFractionDigits: 0,
    },
  ).format(amount)

  const donors = [...board.donors]
    .sort((a: DonorType, b: DonorType) => b.amount - a.amount)
    .slice(0, BOARD_SIZE)
  const podium = donors.slice(0, PODIUM_SIZE)
  const runnersUp = donors.slice(PODIUM_SIZE)
  const total = board.donors.reduce((sum, donor: DonorType) => sum + donor.amount, 0)
  const periodLabel = `${months[language][board.period.month - 1]} ${board.period.year}`

  const displayName = (donor: DonorType) => (
    donor.anonymous ? anonymous_name[language] : donor.name
  )

  const donationsText = (donor: DonorType) => (
    `${donor.donations_count} ${donations_label[language][donor.donations_count === 1 ? 0 : 1]}`
  )

  const avatar = (donor: DonorType) => {
    if (donor.logo_url) {
      return <img src={donor.logo_url} alt={displayName(donor)} className="donors-avatar-logo" />
    }
    if (donor.anonymous) {
      return <FontAwesomeIcon icon={faUserSecret} />
    }
    return getInitials(donor.name)
  }

  return (
    <div className="donors-container" id="donors-leaderboard">
      <Fade in {...{ timeout: 1500 }}>
        <div>
          <Row className="donors-header">
            <Col xs={12}>
              <FontAwesomeIcon icon={faTrophy} className="donors-header-icon" />
              <h2 className="donors-title">{section_title[language]}</h2>
              <p className="donors-period">{periodLabel}</p>
              <p className="donors-subtitle">{section_subtitle[language]}</p>
            </Col>
          </Row>

          <Row className="donors-stats">
            <Col xs={6}>
              <p className="donors-stat-value">{formatAmount(total)}</p>
              <p className="donors-stat-label">{total_label[language]}</p>
            </Col>
            <Col xs={6}>
              <p className="donors-stat-value">{board.donors.length}</p>
              <p className="donors-stat-label">{donors_label[language]}</p>
            </Col>
          </Row>

          <Row className="donors-podium">
            { podium.map((donor: DonorType, index: number) => (
              <Col
                lg={4}
                xs={12}
                className={`donors-podium-column donors-place-${index + 1}`}
                key={donor.id}
                test-id={donor.id}
              >
                <div className="donors-podium-card">
                  <div className="donors-rank">{index + 1}</div>
                  <div className="donors-avatar">
                    { avatar(donor) }
                  </div>
                  <p className="donors-podium-label">{podium_labels[index][language]}</p>
                  <p className="donors-name">{displayName(donor)}</p>
                  <p className="donors-amount">{formatAmount(donor.amount)}</p>
                  <p className="donors-donations">{donationsText(donor)}</p>
                  { donor.message ? (
                    <p className="donors-message">
                      {`“${donor.message[language ? 'en' : 'es']}”`}
                    </p>
                  ) : (null) }
                </div>
              </Col>
            )) }
          </Row>

          { runnersUp.length ? (
            <Row className="donors-list">
              <Col lg={8} xs={12} className="no-padding">
                { runnersUp.map((donor: DonorType, index: number) => (
                  <Row className="donors-list-row" key={donor.id} test-id={donor.id}>
                    <Col xs={2} className="donors-list-rank">
                      {`#${index + PODIUM_SIZE + 1}`}
                    </Col>
                    <Col xs={6} className="donors-list-name">
                      <span>{displayName(donor)}</span>
                      <span className="donors-list-donations">{donationsText(donor)}</span>
                    </Col>
                    <Col xs={4} className="donors-list-amount">
                      {formatAmount(donor.amount)}
                    </Col>
                  </Row>
                )) }
              </Col>
            </Row>
          ) : (null) }

          <Row className="donors-cta">
            <a href={donate_link} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faHeart} className="donors-cta-icon" />
              {cta_label[language]}
            </a>
          </Row>
        </div>
      </Fade>
    </div>
  )
}

export default DonorsLeaderboard
