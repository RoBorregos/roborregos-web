import React from 'react'
import placeholder from '../../../../images/placeholder-rectangle.png'

type Member = {
  id: number,
  name: string,
  lastname: string,
  github: string,
  github_user: string,
  linkedin: string,
  description: string,
  class: string,
  semesters: string,
  subtitle: string,
  status: string,
  role: string
};

type Props = {
  member: Member,
  onHide: any,
  onPrev?: any,
  onNext?: any
};

const tryRequire = (imgPath: string) => {
  try {
    return require(`../../../../images/members/${imgPath}`)
  } catch (err) {
    return placeholder
  }
}

const MemberModal = ({
  member, onHide, onPrev, onNext,
}: Props) => {
  const {
    name, lastname, github, github_user, linkedin, subtitle, status, role, id, semesters, description,
  } = member
  const fullName = `${name} ${lastname}`

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onHide}
    >
      {onPrev && (
        <button type="button" aria-label="Previous member" onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 transition hover:bg-roboblue">
          <i className="fas fa-chevron-left" />
        </button>
      )}
      <div
        className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-gradient-to-tr from-neutral-950 to-neutral-800 shadow-[0_0_60px_rgba(10,56,239,0.35)] md:grid-cols-[1fr_1.4fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" data-testid="closing-btn" aria-label="Close" onClick={onHide} className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 transition hover:bg-roboblue">
          <i className="fas fa-times" />
        </button>
        <img src={tryRequire(`${id}.jpg`)} alt={fullName} className="h-64 w-full object-cover md:h-full" />
        <div className="flex flex-col gap-3 p-6 md:p-8">
          <h2 className="font-jersey text-4xl text-roboblue" data-testid="member-fullName">{fullName}</h2>
          <strong className="font-anton uppercase tracking-wide">{role}</strong>
          {status === 'inactive' && (
            <div className="text-sm text-gray-400">
              <div>{subtitle}</div>
              <div data-testid="member-subtitles">{`Since ${member.class}, ${semesters} semesters`}</div>
            </div>
          )}
          <p className="text-gray-300" data-testid="member-data">{description}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            {github !== '' && (
              <a href={github} target="_blank" rel="noreferrer" className="rb-btn-outline text-sm">
                <i className="fab fa-github mr-2" />
                <span data-testid={github_user}>{github_user}</span>
              </a>
            )}
            {linkedin !== '' && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="rb-btn-outline text-sm">
                <i className="fab fa-linkedin mr-2" />
                <span data-testid="LinkedIn">LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
      {onNext && (
        <button type="button" aria-label="Next member" onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 transition hover:bg-roboblue">
          <i className="fas fa-chevron-right" />
        </button>
      )}
    </div>
  )
}

MemberModal.defaultProps = { onPrev: undefined, onNext: undefined }

export default MemberModal
