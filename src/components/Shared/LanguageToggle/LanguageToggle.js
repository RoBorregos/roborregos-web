// @flow
import React from 'react'

type Props = {
  onToggle: () => void,
};

function LanguageToggle({ onToggle }: Props) {
  return (
    <button
      type="button"
      aria-label="Switch language"
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-roboblue px-4 py-3 font-anton tracking-wide shadow-lg transition hover:scale-105"
    >
      ES/EN
    </button>
  )
}

export default LanguageToggle
