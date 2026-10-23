// @flow
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { sendJoinUsEmail } from "../../../../../scripts/apiScripts";
import FormsSnackBar from "../../../../Shared/FormsSnackBar/FormsSnackbar";

type SelectedPosition = {
  title: string,
};

type Props = {
  selectedPosition: SelectedPosition,
  isOpen: boolean,
  trySubmit: boolean,
  toggle: () => void,
  onSubmit: () => void,
};

function FormsModal(props: Props) {
  const { selectedPosition, isOpen, toggle, onSubmit, trySubmit } = props;
  const recaptchaRef = React.createRef();
  const greeting = `Join us as ${selectedPosition.title}!`;

  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [semester, setSemester] = useState("1");
  const [matricualtionNumber, setMatricualtionNumber] = useState("");
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  const createMail = (recaptchaKey: string) => {
    const emailBody = `Hola soy ${name}
      estudiante de ${career} de ${semester} semestre. \n
      ${comments}`;
    return {
      message: emailBody,
      from_name: name,
      reply_to: `${matricualtionNumber}@itesm.mx`,
      position: selectedPosition.title,
      recaptchaKey,
    };
  };

  const handleSubmit = (recaptchaKey: string) => {
    onSubmit();
    if (name && career && semester && matricualtionNumber && comments) {
      const mailParams = createMail(recaptchaKey);
      setIsLoading(true);
      sendJoinUsEmail(mailParams)
        .then(
          (result) => {
            if (result.status === 200) {
              setOpen(true);
              setMessage("Thanks for your interest! Check your Tec email.");
              setSeverity("success");
            } else {
              setOpen(true);
              setMessage("Something went wrong! Please retry later");
              setSeverity("error");
            }
            setName("");
            setCareer("");
            setSemester("");
            setMatricualtionNumber("");
            setComments("");
          },
          (error) => {
            setOpen(true);
            setMessage("Something went wrong! Please retry later");
            setSeverity("error");
            throw new Error(`Something went wrong! \n${error.message}`);
          }
        )
        .finally(() => {
          setIsLoading(false);
          toggle();
        });
    } else {
      setOpen(true);
      setMessage("Please complete all fields");
      setSeverity("error");
    }
  };

  const handleReCaptcha = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const recaptcha_ref = recaptchaRef.current;
    // $FlowFixMe[incompatible-use]
    recaptcha_ref.reset();
    // $FlowFixMe[incompatible-use]
    recaptcha_ref.execute();
  };

  const inputCls =
    "w-full rounded-lg border border-gray-700 bg-black/60 px-4 py-2 text-white outline-none transition focus:border-roboblue disabled:opacity-50";
  const labelCls = "mb-1 block text-sm text-gray-300";

  return (
    <>
      {isOpen && (
        <div
          id="candidates-join-modal"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={toggle}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-gradient-to-tr from-neutral-950 to-neutral-800 p-6 shadow-[0_0_60px_rgba(10,56,239,0.35)] md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" aria-label="Close" onClick={toggle} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 transition hover:bg-roboblue">
              <i className="fas fa-times" />
            </button>
            <h2 className="mb-6 pr-10 font-jersey text-4xl text-bright">{greeting}</h2>
            <form className={`grid gap-4 md:grid-cols-2 ${isLoading ? "opacity-60" : ""}`} onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className={labelCls} htmlFor="name">Name</label>
                <input type="text" id="name" className={inputCls} placeholder="Juanito" disabled={isLoading} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className={labelCls} htmlFor="matricualtionNumber">Matriculation Number</label>
                <input type="text" id="matricualtionNumber" className={inputCls} placeholder="A01283070" disabled={isLoading} onChange={(e) => setMatricualtionNumber(e.target.value)} />
              </div>
              <div>
                <label className={labelCls} htmlFor="career">Career</label>
                <input type="text" id="career" className={inputCls} placeholder="IMT" disabled={isLoading} onChange={(e) => setCareer(e.target.value)} />
              </div>
              <div>
                <label className={labelCls} htmlFor="semester">Semester</label>
                <select id="semester" className={inputCls} disabled={isLoading} onChange={(e) => setSemester(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                  <option value="9">9+</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls} htmlFor="comments">Tell us about you</label>
                <textarea id="comments" rows={4} className={inputCls} disabled={isLoading} placeholder="Why you want to join the team?" onChange={(e) => setComments(e.target.value)} />
              </div>
              {trySubmit && !(name && career && semester && matricualtionNumber && comments) && (
                <p className="text-red-400 md:col-span-2">Please fill out the entire form</p>
              )}
              <div className="flex justify-center md:col-span-2">
                <button type="button" className="rb-btn px-10" onClick={handleReCaptcha} disabled={isLoading}>
                  {isLoading ? "Sending..." : "Join!"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA ?? "asd"} // FIXME: remove default value
        onChange={handleSubmit}
      />
      <FormsSnackBar
        message={message}
        open_snackbar={open}
        severity={severity}
        handleClose={handleClose}
      />
    </>
  );
}

export default FormsModal;
