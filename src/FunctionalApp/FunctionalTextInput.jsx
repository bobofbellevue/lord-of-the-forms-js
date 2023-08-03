import { ErrorMessage } from "../ErrorMessage";
import { useState, forwardRef } from "react";

function validateTextInput(
  validator,
  setter,
  value,
  setErrorMessage,
  required,
  submitted
) {
  const errorMessage = validator(value, required, submitted);
  setErrorMessage(errorMessage);
  if (!errorMessage) {
    setter(value);
  }
}

function onChangeTextInput(
  validator,
  setter,
  setErrorMessage,
  value,
  setValue,
  required,
  submitted
) {
  setValue(value);
  validateTextInput(
    validator,
    setter,
    value,
    setErrorMessage,
    required,
    submitted
  );
}

// eslint-disable-next-line react/display-name
export const FunctionalTextInput = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div>
      <div className="input-wrap">
        <label>{props.label}:</label>
        <input
          type="text"
          ref={ref}
          placeholder={props.placeholder}
          onChange={(e) =>
            onChangeTextInput(
              props.validator,
              props.setter,
              setErrorMessage,
              e.target.value,
              setValue,
              props.required,
              props.submitted
            )
          }
          value={value}
          list={props.list}
        />
      </div>
      <ErrorMessage message={errorMessage} show={errorMessage.length > 0} />
    </div>
  );
});
