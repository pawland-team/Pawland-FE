const translateEnglishToKorean = (text: string) => {
  const textToLowerCase = text.toLowerCase();

  if (textToLowerCase === 'food') {
    return '사료';
  }

  if (textToLowerCase === 'toy') {
    return '장난감';
  }

  if (textToLowerCase === 'clothes') {
    return '옷';
  }

  if (textToLowerCase === 'accessories') {
    return '악세사리';
  }

  throw new Error('잘못된 입력값이에요.');
};

export { translateEnglishToKorean };
