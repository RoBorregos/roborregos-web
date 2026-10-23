// @flow
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import FormsSnackBar from "../../Shared/FormsSnackBar/FormsSnackbar";
import { sendContactUsEmail } from "../../../scripts/apiScripts";

type Props = {
  language: number,
};

function SendEmail({ language }: Props) {
  const recaptchaRef = React.createRef();

  const title_send_email = [
    "Con tu ayuda podemos llegar más lejos.",
    "With your help we can achieve more.",
  ];

  const forms = [
    ["¡Contáctanos!", "Get in touch!"],
    ["Nombre", "Name"],
    "Email",
    ["Teléfono", "Phone"],
    ["Mensaje", "Your message"],
    ["Enviar copia a mi correo", "Send a copy to my email"],
    ["Enviar", "Send"],
  ];

  const submitMessages = [
    [
      "¡Gracias por contactarnos! Responderemos lo más pronto posible.",
      "Thanks for reaching out! We'll be in contact soon.",
    ],
    [
      "Hubo un error al enviar, intente más tarde.",
      "Something went wrong! Please try later.",
    ],
  ];

  const helperText = [
    "Favor de llenar este campo",
    "Please fill this textfield",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sendCopy, setCopy] = useState(false);
  const [formError, setError] = useState([false, false, false, false]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [messageSnackbar, setMessageSnackbar] = useState(0);

  const handleChangeName = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      formError[0] = false;
      setError(formError);
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    if (event.target.value !== "") {
      formError[1] = false;
      setError(formError);
    }
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
    if (event.target.value !== "") {
      formError[2] = false;
      setError(formError);
    }
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
    if (event.target.value !== "") {
      formError[3] = false;
      setError(formError);
    }
  };

  const handleChangeCheckBox = (event) => {
    setCopy(event.target.checked);
  };

  const handleClose = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  const createMail = (recaptchaKey: string) => {
    const emailBody = `Name: ${name}\n
      Phone number: ${phone}\n
      Email: ${email}\n
      ${message}`;
    return {
      message: emailBody,
      from_name: name,
      reply_to: email,
      send_copy: sendCopy,
      recaptchaKey,
    };
  };

  const handleSubmit = (recaptchaKey: string) => {
    if (name !== "" && email !== "" && phone !== "" && message !== "") {
      const mailParams = createMail(recaptchaKey);
      setIsLoading(true);
      sendContactUsEmail(mailParams)
        .then(
          (result) => {
            if (result.status === 200) {
              setName("");
              setEmail("");
              setPhone("");
              setMessage("");
              setCopy(false);
              setError([false, false, false, false]);
              setOpen(true);
              setSeverity("success");
              setMessageSnackbar(0);
            } else {
              setOpen(true);
              setSeverity("error");
              setMessageSnackbar(1);
              throw new Error(
                "Something went wrong! \nEmail-Server Error, Retry Later"
              );
            }
          },
          (error) => {
            setOpen(true);
            setSeverity("error");
            setMessageSnackbar(1);
            throw new Error(`Something went wrong! \n${error.message}`);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const errors = [false, false, false];
      if (name === "") {
        errors[0] = true;
      }
      if (email === "") {
        errors[1] = true;
      }
      if (phone === "") {
        errors[2] = true;
      }
      if (message === "") {
        errors[3] = true;
      }
      setError(errors);
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

  const fieldCls = (err: boolean) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-black outline-none transition focus:ring-2 focus:ring-roboblue disabled:opacity-50 ${
      err ? "border-red-500" : "border-gray-300"
    }`;
  const errText = (err: boolean) =>
    err ? <p className="mt-1 text-sm text-red-400">{helperText[language]}</p> : null;

  return (
    <>
      <section id="send-email" className="grid gap-10 bg-gradient-to-tr from-navy to-black px-6 py-20 md:grid-cols-2 lg:px-16">
        <div className="flex items-center">
          <h2 className="section-title">{title_send_email[language]}</h2>
        </div>
        <div className="relative rounded-xl bg-neutral-950/80 p-6 shadow-[0_0_50px_rgba(10,56,239,0.3)] md:p-8">
          <form className={`grid gap-4 ${isLoading ? "opacity-60" : ""}`} onSubmit={(e) => e.preventDefault()}>
            <h3 className="font-anton text-3xl uppercase tracking-wide">{forms[0][language]}</h3>
            <div>
              <input className={fieldCls(formError[0])} placeholder={forms[1][language]} value={name} onChange={handleChangeName} disabled={isLoading} />
              {errText(formError[0])}
            </div>
            <div>
              <input className={fieldCls(formError[1])} placeholder="Email" value={email} onChange={handleChangeEmail} disabled={isLoading} />
              {errText(formError[1])}
            </div>
            <div>
              <input className={fieldCls(formError[2])} placeholder={forms[3][language]} value={phone} onChange={handleChangePhone} disabled={isLoading} />
              {errText(formError[2])}
            </div>
            <div>
              <textarea rows={4} className={fieldCls(formError[3])} placeholder={forms[4][language]} value={message} onChange={handleChangeMessage} disabled={isLoading} />
              {errText(formError[3])}
            </div>
            <label className="flex items-center gap-3 text-gray-300">
              <input type="checkbox" className="h-5 w-5 accent-roboblue" checked={sendCopy} onChange={handleChangeCheckBox} disabled={isLoading} />
              {forms[5][language]}
            </label>
            <div className="flex justify-center">
              <button type="submit" className="rb-btn px-10" disabled={isLoading} onClick={handleReCaptcha}>
                {isLoading ? "..." : forms[6][language]}
              </button>
            </div>
          </form>
        </div>
      </section>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA || "asd"} //FIXME: remove asd
        onChange={handleSubmit}
      />
      <FormsSnackBar
        message={submitMessages[messageSnackbar][language]}
        open_snackbar={open}
        severity={severity}
        handleClose={handleClose}
      />
    </>
  );
}

export default SendEmail;
