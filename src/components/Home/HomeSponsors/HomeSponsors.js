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
    <section className="bg-gradient-to-tr from-neutral-950 to-neutral-800 px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-gray-700" />
          <h2 className="font-anton text-lg uppercase tracking-[0.3em] text-gray-300">Our Sponsors</h2>
          <span className="h-px flex-1 bg-gray-700" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {sponsorLarge.map((sponsor) => (
            <HomeSingleSponsor key={sponsor.name} sponsor={sponsor} large />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {sponsorMedium.map((sponsor) => (
            <HomeSingleSponsor key={sponsor.name} sponsor={sponsor} large={false} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeSponsors
