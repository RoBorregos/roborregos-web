// @flow
import React, { useEffect } from 'react'

type Props = {
    message: string,
    severity: string,
    open_snackbar: boolean,
    handleClose: (any, string) => void
};

function FormsSnackbar({
  message, severity, open_snackbar, handleClose,
}: Props) {
  useEffect(() => {
    if (!open_snackbar) return undefined
    const id = setTimeout(() => handleClose(null, 'timeout'), 5000)
    return () => clearTimeout(id)
  }, [open_snackbar, message])

  if (!open_snackbar) return null

  return (
    <div
      role="alert"
      className={`fixed right-4 top-20 z-[70] flex max-w-sm items-start gap-3 rounded-xl px-5 py-4 text-white shadow-2xl ${
        severity === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <span className="flex-1">{message}</span>
      <button type="button" aria-label="Close" onClick={() => handleClose(null, 'close')}>
        <i className="fas fa-times" />
      </button>
    </div>
  )
}

export default FormsSnackbar
