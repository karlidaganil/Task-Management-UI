export const getInitialLetterOfName = (name) => {
  const nameparts = name.trimEnd().split(" ");
  return nameparts.length === 1
    ? nameparts[0].charAt(0).toUpperCase()
    : nameparts[0].charAt(0).toUpperCase() +
        nameparts[nameparts.length - 1].charAt(0).toUpperCase();
};

export const LongTextControl = (text, length = 57) => {
  if (text == null) {
    return "";
  }
  if (text.length <= length) {
    return text;
  }
  text = text.substring(0, length);
  const last = text.lastIndexOf(" ");
  text = text.substring(0, last);
  return text + "...";
};
