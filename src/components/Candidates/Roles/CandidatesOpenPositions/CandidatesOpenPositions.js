// @flow
import React, { useState } from 'react'
import OpenPositionCard from './OpenPositionCard/OpenPositionCard'
import FormsModal from './FormsModal/FormsModal'

type Position = {
  id: string,
  title: string,
  shortDescription: string,
  path: string
};

type PositionsData = {
  positions: Array<Position>,
  url_facebook: string,
  url_form: string
};

type Props = {
  positionsData: PositionsData
};

const CandidatesOpenPostions = (props: Props) => {
  const { positionsData: { positions } } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPosition, setSelectedPos] = useState(positions[0])
  const [trySubmit, setTrySubmit] = useState(false)

  const onSubmit = () => {
    setTrySubmit(true)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const openModal = (pos: Position) => {
    setSelectedPos(pos)
    setIsModalOpen(!isModalOpen)
    setTrySubmit(false)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {positions.map((position) => (
          <OpenPositionCard
            key={position.id}
            position={position}
            onClick={(pos: Position) => openModal(pos)}
          />
        ))}
      </div>
      <FormsModal
        onSubmit={() => onSubmit()}
        selectedPosition={selectedPosition}
        isOpen={isModalOpen}
        toggle={() => toggleModal()}
        trySubmit={trySubmit}
      />
    </div>
  )
}

export default CandidatesOpenPostions
