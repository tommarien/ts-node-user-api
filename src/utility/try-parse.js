/* tslint:disable */
const tryParseInt = (value, defaultValue = undefined) => {
  return (parseInt(value) == value && parseFloat(value) !== NaN) ? parseInt(value) : defaultValue;
}

module.exports = {
  tryParseInt
};
