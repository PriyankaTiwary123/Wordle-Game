export  const countLetterOccurrences = (letters: string[]) => {
    const letterCount: { [key: string]: number } = {};
    letters.forEach((letter) => {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    });
    return letterCount;
  };

