export const isEmailValid = (email: string) => {
  const emailArray = email.split("@");
  if (emailArray.length !== 2) {
    return false;
  }

  const domain = emailArray[1];
  if (domain.length < 3) {
    return false;
  }

  if (!domain.includes(".")) {
    return false;
  }

  return true;
};

export const formatPhoneNumner = (phoneNumber: string) => {
  const phoneNumberRegex = /^(\d{2})?(\d{1})?(\d{4})?(\d{4})?$/;
  const phoneNumberMatches = phoneNumberRegex.exec(phoneNumber);

  if (!phoneNumberMatches) {
    return "";
  }

  const ddd = phoneNumberMatches[1] ? `(${phoneNumberMatches[1]})` : "";
  const firstPart = phoneNumberMatches[2] ? ` ${phoneNumberMatches[2]}` : "";
  const secondPart = phoneNumberMatches[3] ? ` ${phoneNumberMatches[3]}-` : "";
  const thirdPart = phoneNumberMatches[4] ? phoneNumberMatches[4] : "";

  return `${ddd}${firstPart}${secondPart}${thirdPart}`.trim();
};
