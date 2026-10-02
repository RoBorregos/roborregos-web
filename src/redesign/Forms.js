// Join and contact forms. Same backend endpoints and invisible reCAPTCHA
// flow as the original components.
import React, { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { sendContactUsEmail, sendJoinUsEmail } from '../scripts/apiScripts'
import { Icons, Toast } from './lib'

const SITE_KEY = process.env.REACT_APP_RECAPTCHA || 'asd' // FIXME: inherited placeholder key

function useForm(initial) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const bind = (name) => ({
    name,
    id: `f-${name}`,
    value: values[name],
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `f-${name}-error` : undefined,
    onChange: (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setValues((v) => ({ ...v, [name]: value }))
      if (errors[name]) setErrors((er) => ({ ...er, [name]: false }))
    },
  })
  const validate = (required) => {
    const next = {}
    required.forEach((k) => { if (!String(values[k]).trim()) next[k] = true })
    setErrors(next)
    return Object.keys(next).length === 0
  }
  return {
    values, setValues, errors, bind, validate,
  }
}

// The badge is hidden, so Google requires this notice next to every protected form.
function RecaptchaNotice() {
  return (
    <p className="small recaptcha-notice">
      Protected by reCAPTCHA. The Google
      {' '}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>
      {' '}
      and
      {' '}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>
      {' '}
      apply.
    </p>
  )
}

function Field({
  name, label, error, errorText, children,
}) {
  return (
    <div className={`field-row ${error ? 'has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {children}
      {error && <span className="error" id={`f-${name}-error`}>{errorText}</span>}
    </div>
  )
}

/* ------------------------------ Contact ------------------------------ */
const CONTACT_COPY = {
  en: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    copy: 'Send me a copy',
    send: 'Send message',
    sending: 'Sending message…',
    required: (f) => `Add your ${f.toLowerCase()} so we can reply.`,
    ok: 'Message sent. We usually reply within a few days.',
    fail: "Your message wasn't sent because our mail server didn't respond. Try again in a few minutes, or email teamroborregos@gmail.com.",
  },
  es: {
    name: 'Nombre',
    email: 'Email',
    phone: 'Teléfono',
    message: 'Mensaje',
    copy: 'Enviarme una copia',
    send: 'Enviar mensaje',
    sending: 'Enviando mensaje…',
    required: (f) => `Agrega tu ${f.toLowerCase()} para poder responderte.`,
    ok: 'Mensaje enviado. Normalmente respondemos en unos días.',
    fail: 'Tu mensaje no se envió porque nuestro servidor de correo no respondió. Intenta de nuevo en unos minutos o escribe a teamroborregos@gmail.com.',
  },
}

export function ContactForm({ lang = 'en' }) {
  const t = CONTACT_COPY[lang]
  const recaptcha = useRef(null)
  const {
    values, setValues, errors, bind, validate,
  } = useForm({
    name: '', email: '', phone: '', message: '', sendCopy: false,
  })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    if (!validate(['name', 'email', 'phone', 'message'])) return
    recaptcha.current.reset()
    recaptcha.current.execute()
  }

  const send = (recaptchaKey) => {
    if (!recaptchaKey) return
    setLoading(true)
    sendContactUsEmail({
      message: `Name: ${values.name}\nPhone number: ${values.phone}\nEmail: ${values.email}\n${values.message}`,
      from_name: values.name,
      reply_to: values.email,
      send_copy: values.sendCopy,
      recaptchaKey,
    })
      .then((result) => {
        if (result.status === 200) {
          setValues({
            name: '', email: '', phone: '', message: '', sendCopy: false,
          })
          setToast({ tone: 'success', message: t.ok })
        } else {
          setToast({ tone: 'error', message: t.fail })
        }
      }, () => setToast({ tone: 'error', message: t.fail }))
      .finally(() => setLoading(false))
  }

  return (
    <form className="form-grid form-grid--2" onSubmit={submit} noValidate>
      <Field name="name" label={t.name} error={errors.name} errorText={t.required(t.name)}>
        <input {...bind('name')} autoComplete="name" disabled={loading} />
      </Field>
      <Field name="email" label={t.email} error={errors.email} errorText={t.required(t.email)}>
        <input {...bind('email')} type="email" autoComplete="email" disabled={loading} />
      </Field>
      <div className="form-grid__full">
        <Field name="phone" label={t.phone} error={errors.phone} errorText={t.required(t.phone)}>
          <input {...bind('phone')} type="tel" autoComplete="tel" disabled={loading} />
        </Field>
      </div>
      <div className="form-grid__full">
        <Field name="message" label={t.message} error={errors.message} errorText={t.required(t.message)}>
          <textarea {...bind('message')} rows={5} disabled={loading} />
        </Field>
      </div>
      <label className="checkbox form-grid__full" htmlFor="f-sendCopy">
        <input type="checkbox" {...bind('sendCopy')} checked={values.sendCopy} disabled={loading} />
        {t.copy}
      </label>
      <div className="form-grid__full">
        <button type="submit" className="checkpoint form-submit" disabled={loading}>
          {loading ? t.sending : t.send}
          {!loading && <Icons.Arrow />}
        </button>
      </div>
      <RecaptchaNotice />
      <div className="recaptcha-slot"><ReCAPTCHA ref={recaptcha} size="invisible" badge="inline" sitekey={SITE_KEY} onChange={send} /></div>
      <Toast message={toast && toast.message} tone={toast && toast.tone} onClose={() => setToast(null)} />
    </form>
  )
}

/* ------------------------------ Join (Candidates) ------------------------------ */
export function JoinSheet({ position, onClose }) {
  const recaptcha = useRef(null)
  const {
    values, errors, bind, validate,
  } = useForm({
    name: '', career: '', semester: '1', matriculation: '', comments: '',
  })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const submit = (e) => {
    e.preventDefault()
    if (!validate(['name', 'career', 'semester', 'matriculation', 'comments'])) return
    recaptcha.current.reset()
    recaptcha.current.execute()
  }

  const send = (recaptchaKey) => {
    if (!recaptchaKey) return
    setLoading(true)
    sendJoinUsEmail({
      message: `Hola soy ${values.name}, estudiante de ${values.career} de ${values.semester} semestre.\n${values.comments}`,
      from_name: values.name,
      reply_to: `${values.matriculation}@itesm.mx`,
      position: position.title,
      recaptchaKey,
    })
      .then((result) => {
        setToast(result.status === 200
          ? { tone: 'success', message: 'Application sent. Check your Tec email for next steps.' }
          : { tone: 'error', message: "Your application wasn't sent because our mail server didn't respond. Try again in a few minutes." })
      }, () => setToast({ tone: 'error', message: "Your application wasn't sent because our mail server didn't respond. Try again in a few minutes." }))
      .finally(() => setLoading(false))
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="join-title" onClick={onClose}>
      <div className="sheet__panel join" onClick={(e) => e.stopPropagation()}>
        <div className="join__head">
          <h2 id="join-title" className="h2">{`Apply as ${position.title}`}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close application"><Icons.Close /></button>
        </div>
        <form className="form-grid form-grid--2" onSubmit={submit} noValidate>
          <Field name="name" label="Full name" error={errors.name} errorText="Add your full name.">
            <input {...bind('name')} autoComplete="name" disabled={loading} />
          </Field>
          <Field name="matriculation" label="Student ID" error={errors.matriculation} errorText="Add your student ID, like A01234567.">
            <input {...bind('matriculation')} placeholder="A01234567" disabled={loading} />
          </Field>
          <Field name="career" label="Major" error={errors.career} errorText="Add your major.">
            <input {...bind('career')} placeholder="ITC, IMT, IDM…" disabled={loading} />
          </Field>
          <Field name="semester" label="Semester" error={errors.semester} errorText="Pick your semester.">
            <select {...bind('semester')} disabled={loading}>
              {Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            </select>
          </Field>
          <div className="form-grid__full">
            <Field name="comments" label="Why do you want to join?" error={errors.comments} errorText="Tell us a little about why you want to join.">
              <textarea {...bind('comments')} rows={4} disabled={loading} />
            </Field>
          </div>
          <div className="form-grid__full">
            <button type="submit" className="checkpoint form-submit" disabled={loading}>
              {loading ? 'Sending application…' : 'Send application'}
              {!loading && <Icons.Arrow />}
            </button>
          </div>
          <RecaptchaNotice />
      <div className="recaptcha-slot"><ReCAPTCHA ref={recaptcha} size="invisible" badge="inline" sitekey={SITE_KEY} onChange={send} /></div>
        </form>
      </div>
      <Toast message={toast && toast.message} tone={toast && toast.tone} onClose={() => setToast(null)} />
    </div>
  )
}
