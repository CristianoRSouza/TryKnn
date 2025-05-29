export const formatPhoneNumber = (phoneNumber: string) => {
  const phoneNumberArray = phoneNumber.split("");
  const phoneNumberLength = phoneNumberArray.length;

  if (phoneNumberLength === 11) {
    return `(${phoneNumberArray.slice(0, 2).join("")}) ${phoneNumberArray
      .slice(2, 7)
      .join("")}-${phoneNumberArray.slice(7, 11).join("")}`;
  } else if (phoneNumberLength === 10) {
    return `(${phoneNumberArray.slice(0, 2).join("")}) ${phoneNumberArray
      .slice(2, 6)
      .join("")}-${phoneNumberArray.slice(6, 10).join("")}`;
  } else {
    return phoneNumber;
  }
};

export const removeCaps = (str: string) => {
  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  const stateUfs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  const prepositions = [
    "de",
    "da",
    "do",
    "dos",
    "das",
    "em",
    "e",
    "a",
    "o",
    "os",
    "as",
    "na",
    "no",
    "nas",
    "nos",
  ];

  const strArray = str.split(" ");
  const strArrayLength = strArray.length;

  let newStr = "";

  for (let i = 0; i < strArrayLength; i++) {
    const word = strArray[i];
    if (word === "KNN") {
      newStr += "KNN ";
    } else if (
      word.length > 2 &&
      !prepositions.includes(word) &&
      !romanNumerals.includes(word) &&
      !stateUfs.includes(word)
    ) {
      newStr += `${word.charAt(0).toUpperCase()}${word
        .slice(1)
        .toLowerCase()} `;
    } else {
      newStr += `${word.toLowerCase()} `;
    }
  }

  return newStr.trim();
};

export const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const formatDate = (date: string) => {
  // date format: 2024-06-01 from 2022-07-13T09:53:46 or 2022-07-13T09:53:46.000Z

  const dateArray = date.split("-");
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2].split("T")[0];

  return `${year}-${month}-${day}`;
};
