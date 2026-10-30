import React from 'react'
import placeholder from '../../../../../images/placeholder-rectangle.png'

type Position = {
  id: string,
  title: string,
  shortDescription: string,
  path: string
};

type Props = {
  position: Position,
  onClick: (position: Position) => void
};

const tryRequireImg = (imgPath: string) => {
  try {
    return require(`../../../../../images/candidates/roles/${imgPath}`)
  } catch (err) {
    return placeholder
  }
}

const OpenPositionCard = ({ position, onClick }: Props) => (
  <button
    type="button"
    onClick={() => onClick(position)}
    className="group relative h-80 overflow-hidden rounded-xl bg-card text-left transition duration-300 hover:shadow-[10px_10px_10px_rgba(0,0,0,0.5)]"
  >
    <img
      src={tryRequireImg(position.path)}
      alt={position.title}
      className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6">
      <h3 className="font-anton text-2xl uppercase tracking-wide text-white group-hover:text-bright">{position.title}</h3>
      <p className="mt-2 text-sm text-gray-300">{position.shortDescription}</p>
    </div>
  </button>
)

export default OpenPositionCard
