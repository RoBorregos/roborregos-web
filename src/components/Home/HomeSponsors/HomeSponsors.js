// @flow
import React from 'react'
import HomeSingleSponsor from './HomeSingleSponsor/HomeSingleSponsor'

type SponsorType = {
  name: string,
  img_path: string,
  link: string,
  size?: string,
};

type Props = {
  sponsors: Array<SponsorType>,
};

const HomeSponsors = ({ sponsors }: Props) => {
  const sponsorLarge = sponsors.filter((sponsor) => sponsor.size === 'L')
  const sponsorMedium = sponsors.filter((sponsor) => sponsor.size === 'M')

  return (
    <section className="bg-gradient-to-tr from-neutral-950 to-neutral-800 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title mb-12 text-center">Our Sponsors</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sponsorLarge.map((sponsor) => (
            <HomeSingleSponsor key={sponsor.name} sponsor={sponsor} large />
          ))}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sponsorMedium.map((sponsor) => (
            <HomeSingleSponsor key={sponsor.name} sponsor={sponsor} large={false} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeSponsors
