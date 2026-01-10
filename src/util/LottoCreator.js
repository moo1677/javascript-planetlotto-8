import randomNumbers from '../service/randomNumbers.js';

export const LottoCreator = {
  setLotto(lottoCount) {
    let lottos = [];
    for (let i = 0; i < lottoCount; i += 1) {
      const numbers = sortNumber(randomNumbers());
      lottos.push(numbers);
    }
    return lottos;
  },
};
const sortNumber = (numbers) => {
  return [...numbers].sort((a, b) => a - b);
};
