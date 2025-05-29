// format text to lower case and remove accents

export const toPlainText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const removeCaps = (str: string) => {
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
    } else if (word.length > 2 && !prepositions.includes(word)) {
      newStr += `${word.charAt(0).toUpperCase()}${word
        .slice(1)
        .toLowerCase()} `;
    } else {
      newStr += `${word.toLowerCase()} `;
    }
  }

  return newStr.trim();
};
