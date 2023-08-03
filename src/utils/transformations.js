export const capitalize = (value) => {
  const lowString = value.toLowerCase();
  let newValue = "";
  let workingString = "";
  let whiteSpace = true;
  for (let i = 0; i < lowString.length; i++) {
    workingString = lowString[i];
    if (whiteSpace) {
      workingString = workingString.toUpperCase();
      whiteSpace = false;
    }
    newValue += workingString;
    if (workingString[0] === " ") {
      whiteSpace = true;
    }
  }
  return newValue;
};

export const formatPalantirNumber = (palantir) => {
  return (
    palantir[0] + "-" + palantir[1] + "-" + palantir[2] + "-" + palantir[3]
  );
};
