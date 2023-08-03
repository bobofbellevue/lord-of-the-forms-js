import { useRef, useState, forwardRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { validatePalantir } from "../utils/validations.js";

function setPalantirCaret(value, backwards, oldValueLength, refs) {
  const newValue = value;
  switch (newValue.length) {
    case 0:
      refs.palantirRef1.current.focus();
      refs.palantirRef1.current.selectionStart = 0;
      refs.palantirRef1.current.selectionEnd = 0;
      break;
    case 1:
      refs.palantirRef1.current.focus();
      refs.palantirRef1.current.selectionStart = 1;
      refs.palantirRef1.current.selectionEnd = 1;
      break;
    case 2:
      if (value.length >= oldValueLength && !backwards) {
        refs.palantirRef2.current.focus();
        refs.palantirRef2.current.selectionStart = 0;
        refs.palantirRef2.current.selectionEnd = 0;
      } else {
        refs.palantirRef1.current.focus();
        refs.palantirRef1.current.selectionStart = 2;
        refs.palantirRef1.current.selectionEnd = 2;
      }
      break;
    case 3:
      refs.palantirRef2.current.focus();
      refs.palantirRef2.current.selectionStart = 1;
      refs.palantirRef2.current.selectionEnd = 1;
      break;
    case 4:
      if (value.length >= oldValueLength && !backwards) {
        refs.palantirRef3.current.focus();
        refs.palantirRef3.current.selectionStart = 0;
        refs.palantirRef3.current.selectionEnd = 0;
      } else {
        refs.palantirRef2.current.focus();
        refs.palantirRef2.current.selectionStart = 2;
        refs.palantirRef2.current.selectionEnd = 2;
      }
      break;
    case 5:
      refs.palantirRef3.current.focus();
      refs.palantirRef3.current.selectionStart = 1;
      refs.palantirRef3.current.selectionEnd = 1;
      break;
    case 6:
      if (value.length >= oldValueLength && !backwards) {
        refs.palantirRef4.current.focus();
        refs.palantirRef4.current.selectionStart = 0;
        refs.palantirRef4.current.selectionEnd = 0;
      } else {
        refs.palantirRef3.current.focus();
        refs.palantirRef3.current.selectionStart = 2;
        refs.palantirRef3.current.selectionEnd = 2;
      }
      break;
    case 7:
      refs.palantirRef4.current.focus();
      refs.palantirRef4.current.selectionStart = 1;
      refs.palantirRef4.current.selectionEnd = 1;
      break;
    default:
      refs.palantirRef1.current.focus();
      refs.palantirRef1.current.selectionStart = 0;
      refs.palantirRef1.current.selectionEnd = 0;
      break;
  }
}

function onChangePalantir(
  maySetFocus,
  required,
  submitted,
  refs,
  value,
  setValue,
  setOldValueLength,
  setErrorMessage,
  setter
) {
  const oldValueLength = value.length;
  setOldValueLength({ oldValueLength: oldValueLength });
  let newValue = refs.palantirRef1.current.value.replace(/[^0-9]/g, "");
  newValue += refs.palantirRef2.current.value.replace(/[^0-9]/g, "");
  newValue += refs.palantirRef3.current.value.replace(/[^0-9]/g, "");
  newValue += refs.palantirRef4.current.value.replace(/[^0-9]/g, "");
  setValue([
    newValue.slice(0, 2),
    newValue.slice(2, 4),
    newValue.slice(4, 6),
    newValue.slice(6, 7),
  ]);
  if (maySetFocus) {
    setPalantirCaret(newValue, false, oldValueLength, refs);
  }
  onValidatePalantir(
    newValue.slice(0, 2) +
      newValue.slice(2, 4) +
      newValue.slice(4, 6) +
      newValue.slice(6, 7),
    required,
    submitted,
    setErrorMessage,
    setter
  );
}

function onValidatePalantir(
  value,
  required,
  submitted,
  setErrorMessage,
  setter
) {
  const errorMessage = validatePalantir(value, required, submitted);
  setErrorMessage(errorMessage);
  if (!errorMessage) {
    setter(value);
  }
}

function onKeyUpPalantir(e, value, refs) {
  if (e.key === "Backspace") {
    setPalantirCaret(value, true, 0, refs);
  }
}

// eslint-disable-next-line react/display-name
export const FunctionalPalantirInput = (props) => {
  const [value, setValue] = useState(["", "", "", ""]);
  const [oldValueLength, setOldValueLength] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");
  const [required, setRequired] = useState(props.required);
  const refs = {
    palantirRef1: useRef(),
    palantirRef2: useRef(),
    palantirRef3: useRef(),
    palantirRef4: useRef(),
  };

  return (
    <div>
      <div className="input-wrap">
        <label htmlFor={props.label}>{props.label}:</label>
        <div id="palantir-input-wrap">
          <input
            type="text"
            id="palantir-input-1"
            onChange={() =>
              onChangePalantir(
                true,
                props.required,
                props.submitted,
                refs,
                value[0],
                setValue,
                setOldValueLength,
                setErrorMessage,
                props.setter
              )
            }
            ref={refs.palantirRef1}
            value={value[0]}
          />
          -
          <input
            type="text"
            id="palantir-input-2"
            onChange={() =>
              onChangePalantir(
                true,
                props.required,
                props.submitted,
                refs,
                value[1],
                setValue,
                setOldValueLength,
                setErrorMessage,
                props.setter
              )
            }
            onKeyUp={(e) => onKeyUpPalantir(e, value, refs)}
            ref={refs.palantirRef2}
            value={value[1]}
          />
          -
          <input
            type="text"
            id="palantir-input-3"
            onChange={() =>
              onChangePalantir(
                true,
                props.required,
                props.submitted,
                refs,
                value[2],
                setValue,
                setOldValueLength,
                setErrorMessage,
                props.setter
              )
            }
            onKeyUp={(e) => onKeyUpPalantir(e, value, refs)}
            ref={refs.palantirRef3}
            value={value[2]}
          />
          -
          <input
            type="text"
            id="palantir-input-4"
            onChange={() =>
              onChangePalantir(
                true,
                props.required,
                props.submitted,
                refs,
                value[3],
                setValue,
                setOldValueLength,
                setErrorMessage,
                props.setter
              )
            }
            onKeyUp={(e) => onKeyUpPalantir(e, value, refs)}
            ref={refs.palantirRef4}
            value={value[3]}
          />
        </div>
      </div>
      <ErrorMessage message={errorMessage} show={errorMessage.length > 0} />
    </div>
  );
};
