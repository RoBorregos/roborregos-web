// @flow
import React from 'react'
import backgroundImage from '../../../images/small_logo.png'

type ColorScheme = {
    primary: string,
    secondary: string
};

type AdditionalButton = {
    text: string,
    bgColor: string,
    borderColor: string,
    onClick: () => void
};

type Props = {
    title: string,
    mainText: Array<string>,
    subText: Array<string>,
    bgColorScheme?: ColorScheme,
    iconColorScheme?: ColorScheme,
    additionalButton?: ?AdditionalButton
};

const lines = (text: Array<string>) => text.map((line) => (
  <React.Fragment key={line}>
    {line}
    <br />
  </React.Fragment>
))

function HeaderBanner({
  title, mainText, subText, additionalButton,
}: Props) {
  const scrollToInfo = () => {
    window.scrollBy({ top: window.innerHeight - 64 - window.scrollY, behavior: 'smooth' })
  }

  return (
    <header className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-between overflow-hidden px-6 py-16 text-center">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] -translate-x-1/2 -translate-y-1/2 opacity-10"
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-96 -translate-x-1/2 rounded-full bg-navy blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 my-auto max-w-3xl">
        <h1 className="font-jersey text-6xl text-roboblue md:text-8xl">{title}</h1>
        <p className="section-subtitle mt-6 normal-case leading-relaxed">{lines(mainText)}</p>
        {additionalButton ? (
          <button type="button" onClick={additionalButton.onClick} className="rb-btn mt-8">
            {additionalButton.text}
          </button>
        ) : null}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 text-gray-400">
        <p className="text-sm">{lines(subText)}</p>
        <button
          type="button"
          aria-label="Scroll down"
          onClick={scrollToInfo}
          className="text-3xl transition duration-300 hover:text-roboblue"
        >
          <i className="fas fa-angle-down" />
        </button>
      </div>
    </header>
  )
}

HeaderBanner.defaultProps = {
  bgColorScheme: undefined,
  iconColorScheme: undefined,
  additionalButton: null,
}

export default HeaderBanner
