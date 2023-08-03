import { allAbodes } from "./all-abodes.js";

export function validateName(value, required, submitted) {
  let errorMessage = "";
  if (required && value.length === 0) {
    errorMessage += "Name is required. ";
  } else if (submitted && value.length === 1) {
    errorMessage += "Name is too short. ";
  } else if (value.length > 30) {
    errorMessage += "Name is too long. ";
  }
  if (value.length > 0 && !/^[a-zA-Z\- ëúóûá'()íî]+$/.test(value)) {
    errorMessage += "Invalid characters in name. ";
  }
  return errorMessage;
}

export function validateAbode(value, required, submitted) {
  let errorMessage = validateName(value, required, submitted);
  if (
    submitted &&
    value.length > 0 &&
    !allAbodes.find(
      (abode) => abode.toUpperCase() === value.toUpperCase(),
      value
    )
  ) {
    errorMessage += "This place existeth not in Middle Earth. ";
  }
  return errorMessage;
}

export function validateEmail(value, required, submitted) {
  let errorMessage = "";
  if (submitted && required && value.length === 0) {
    errorMessage += "Email is required. ";
  }
  const validEmailFormat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (submitted && value.length > 0 && !validEmailFormat.test(value)) {
    errorMessage += "Invalid email format. ";
  }
  return errorMessage;
}

export function validatePalantir(value, required, submitted) {
  const newValue = value.match(/\d+/g);
  value = newValue ? newValue.join("") : "";
  let errorMessage = "";
  if (required && value.length === 0) {
    errorMessage += "Palantir is required. ";
  } else if (submitted && value.length < 7) {
    errorMessage += "Palantir number is too short. ";
  }
  return errorMessage;
}
