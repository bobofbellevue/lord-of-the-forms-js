import { useState, useRef } from "react";
import { FunctionalTextInput } from "./FunctionalTextInput";
import { FunctionalPalantirInput } from "./FunctionalPalantirInput";
import {
  validateName,
  validateAbode,
  validateEmail,
  validatePalantir,
} from "../utils/validations.js";

function validateForm(user, refs) {
  let errorMessage = "";
  errorMessage += validateName(refs.nameRef.current.value, true, true);
  errorMessage += validateName(refs.clanRef.current.value, false, true);
  errorMessage += validateAbode(refs.abodeRef.current.value, true, true);
  errorMessage += validatePalantir(user.palantir.toString(), true, true);
  errorMessage += validateEmail(refs.emailRef.current.value, true, true);
  return errorMessage;
}

function onSubmit(e, setter, user, refs, props) {
  e.preventDefault();
  setter(true);
  const errorMessage = validateForm(user, refs, setter);
  if (!errorMessage) {
    props.setUser({
      name: user.name,
      clan: user.clan,
      abode: user.abode,
      palantir: [
        user.palantir.slice(0, 2),
        user.palantir.slice(2, 4),
        user.palantir.slice(4, 6),
        user.palantir.slice(6, 7),
      ],
      email: user.email,
    });
  }
}

export const FunctionalForm = (props) => {
  const [user, setUserInState] = useState({
    name: props.name,
    clan: props.clan,
    abode: props.abode,
    palantir: props.palantir,
    email: props.email,
  });
  const [submitted, setSubmitted] = useState(false);
  const refs = {
    nameRef: useRef(),
    clanRef: useRef(),
    abodeRef: useRef(),
    palantirRef: useRef(),
    emailRef: useRef(),
  };

  return (
    <form>
      <u>
        <h3>User Information Form</h3>
      </u>
      <FunctionalTextInput
        label="Name *"
        value={user.name}
        ref={refs.nameRef}
        required={true}
        submitted={submitted}
        validator={validateName}
        setter={(name) => setUserInState({ ...user, name: name })}
      />
      <FunctionalTextInput
        label="Clan"
        value={user.clan}
        ref={refs.clanRef}
        required={false}
        submitted={submitted}
        validator={validateName}
        setter={(clan) => setUserInState({ ...user, clan: clan })}
      />
      <FunctionalTextInput
        label="Abode *"
        value={user.abode}
        ref={refs.abodeRef}
        required={true}
        submitted={submitted}
        validator={validateAbode}
        setter={(abode) => setUserInState({ ...user, abode: abode })}
        list="abodes"
      />
      <FunctionalPalantirInput
        label="Palantir *"
        value={user.palantir}
        required={true}
        submitted={submitted}
        setter={(palantir) => setUserInState({ ...user, palantir: palantir })}
      />
      <FunctionalTextInput
        label="Email *"
        value={user.email}
        ref={refs.emailRef}
        required={true}
        submitted={submitted}
        validator={validateEmail}
        setter={(email) => setUserInState({ ...user, email: email })}
      />
      <input
        type="submit"
        value="Submit"
        onClick={(e) => onSubmit(e, setSubmitted, user, refs, props)}
      />
    </form>
  );
};
