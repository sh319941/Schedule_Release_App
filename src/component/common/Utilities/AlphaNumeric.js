export const alphaNumeric = (e) => {
  const re = /^[ a-zA-Z0-9]+$/;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
};

export const alphaNumericwithoutsapce = (e) => {
  const re = /^[a-zA-Z0-9]+$/;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
};

export const restrictNumber = (e) => {
  const re = /^[ 0-9]+$/;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
};

export const checkalphaNumeric = (val) => {
  const re = /^[a-zA-Z0-9]+$/;
  if (!re.test(val)) {
    return false;
  }
  return true;
};

export const ToUpperCaseLetter = (e) => {
  e.target.value = `${e.target.value}`.toUpperCase();
};
