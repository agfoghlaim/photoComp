export const isProbablyEmail =  (str) => {
  var re = /\S+@\S+\.\S+/;
  if (str.length < 50) {
    return re.test(str);
  }
  return false;
}

export const validate= (val, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = val.trim() !== '' && isValid;
  }
  if (rules.min) {
    isValid = val.length >= rules.min && isValid;
  }
  if (rules.max) {
    isValid = val.length <= rules.max && isValid;
  }
  if (rules.isProbablyEmail) {
    isValid = isProbablyEmail(val) && isValid;
  }
  return isValid;
}