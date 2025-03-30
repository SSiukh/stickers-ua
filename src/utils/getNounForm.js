export function getNounForm(number, singular, pluralFew, pluralMany) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return `${number} ${singular}`;
  } else if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    (number % 100 < 10 || number % 100 >= 20)
  ) {
    return `${number} ${pluralFew}`;
  } else {
    return `${number} ${pluralMany}`;
  }
}
