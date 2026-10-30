// @flow
import React from 'react'
import placeholder from '../../../../images/placeholder-rectangle.png'

type SponsorType = {
  name: string,
  img_path: string,
  link: string,
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

const HomeSingleSponsor = ({ sponsor, large }: Props) => (
  <a
    href={sponsor.link}
    target="_blank"
    rel="noreferrer noopener"
    className={`group flex items-center justify-center rounded-lg bg-white p-4 opacity-90 transition duration-300 hover:scale-105 hover:opacity-100 hover:shadow-[0_0_24px_rgba(10,56,239,0.5)] ${
      large ? 'h-28' : 'h-20'
    }`}
  >
    <img
      src={tryRequire(sponsor.img_path)}
      alt={sponsor.name}
      className="max-h-full max-w-full object-contain"
    />
  </a>
)

export default HomeSingleSponsor
