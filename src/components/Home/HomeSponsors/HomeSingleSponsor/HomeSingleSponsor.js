// @flow
import React from 'react'
import placeholder from '../../../../images/placeholder-rectangle.png'

type SponsorType = {
  name: string,
  img_path: string,
  link: string,
  // Dark logos (e.g. black text) are inverted so they read on the dark card.
  invert?: boolean,
};

type Props = {
  sponsor: SponsorType,
  large: boolean,
};

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../../images/sponsors/${imgPath}`)
  } catch (err) {
    return placeholder
  }
}

const HomeSingleSponsor = ({ sponsor, large }: Props) => {
  const className = `group flex items-center justify-center rounded-lg border border-white/10 bg-neutral-900/80 p-5 opacity-90 transition duration-300 hover:scale-105 hover:border-white/20 hover:opacity-100 hover:shadow-[0_0_24px_rgba(10,56,239,0.5)] ${
    large ? 'h-28' : 'h-20'
  }`
  const logo = (
    <img
      src={tryRequire(sponsor.img_path)}
      alt={sponsor.name}
      className="max-h-full max-w-full object-contain"
      // invert + hue-rotate flips black to white while keeping brand hues (e.g. the .mx blue dot)
      style={sponsor.invert ? { filter: 'invert(1) hue-rotate(180deg)' } : undefined}
    />
  )

  if (!sponsor.link) {
    return <div className={className}>{logo}</div>
  }

  return (
    <a
      href={sponsor.link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={sponsor.name}
      className={className}
    >
      {logo}
    </a>
  )
}

export default HomeSingleSponsor
