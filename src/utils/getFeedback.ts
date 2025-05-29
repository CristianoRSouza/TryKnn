export const getPronunciationFeedback = (score: number) => {
  const maxScore = 100;
  const scoreInPercentage = (score / maxScore) * 100;

  if (scoreInPercentage <= 25) {
    return "Sua pronúncia precisa de bastante trabalho. Concentre-se em melhorar a sua articulação e na pronúncia correta das palavras.";
  } else if (scoreInPercentage <= 50) {
    return "Sua pronúncia está abaixo do esperado. Continue praticando para aprimorar a forma como você pronuncia as palavras e expressa os sons do idioma.";
  } else if (scoreInPercentage <= 75) {
    return "Sua pronúncia está se desenvolvendo bem. Continue praticando para alcançar uma pronúncia mais clara e natural.";
  } else {
    return "Parabéns pelo excelente desempenho na pronúncia! Sua habilidade de se expressar claramente é notável. Continue assim!";
  }
};

export const getFluencyFeedback = (score: number) => {
  const maxScore = 100;
  const scoreInPercentage = (score / maxScore) * 100;

  if (scoreInPercentage <= 25) {
    return "Sua fluência precisa de bastante trabalho. Concentre-se em desenvolver sua habilidade de falar de forma mais fluida e contínua.";
  } else if (scoreInPercentage <= 50) {
    return "Sua fluência está abaixo do esperado. Pratique mais para melhorar sua capacidade de se expressar de forma mais fluente e natural.";
  } else if (scoreInPercentage <= 75) {
    return "Sua fluência está em um bom nível. Continue praticando para se tornar ainda mais fluente e confiante ao falar.";
  } else {
    return "Parabéns pela fluência excepcional! Sua capacidade de se comunicar de forma clara e fluida é impressionante. Continue assim!";
  }
};

export const getTestFeedback = (approved: boolean) => {
  if (approved) {
    return "Parabéns, estamos muito contentes que você alcançou a pontuação necessária para passar para a próxima fase.<br/> Agora é conosco, aguarde o contato com as instruções para a próxima etapa. Enquanto isso, veja o feedback do seu teste";
  };

  return "Parabéns, você completou o teste e está no caminho certo. Entendemos que agora não é o melhor momento para se tornar um teacher KNN, e por isso gostaríamos de sugerir que continue seus estudos, e aplique novamente daqui a alguns meses. Para ajudá-lo nesse processo, sugerimos que ler o feedback do seu teste.";
};

export const getIntoantionFeedback = (score: number) => {
  const maxScore = 100;
  const scoreInPercentage = (score / maxScore) * 100;

  if (scoreInPercentage <= 25) {
    return "Sua entonação precisa de muita melhoria. Trabalhe na variação e na entonação correta das frases para transmitir suas ideias de forma mais eficaz.";
  } else if (scoreInPercentage <= 50) {
    return "Sua entonação está abaixo do esperado. Pratique para melhorar a forma como você modula sua voz ao falar e transmitir suas emoções de maneira mais clara.";
  } else if (scoreInPercentage <= 75) {
    return "Sua entonação está adequada, mas ainda pode ser aprimorada. Continue praticando para desenvolver uma entonação mais natural e expressiva.";
  } else {
    return "Parabéns pela excelente entonação! Sua capacidade de transmitir emoção e ênfase ao falar é notável. Continue assim!";
  }
};
