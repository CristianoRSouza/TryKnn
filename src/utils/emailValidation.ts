export const checkEmail = (email: string) => {
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
