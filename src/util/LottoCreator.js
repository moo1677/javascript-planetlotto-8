import randomNumbers from '../service/randomNumbers.js';
import Lotto from '../model/Lotto.js';
import { LOTTO_CONSTANTS } from '../constants/format.js';

export const LottoCreator = {
  setLotto(lottoCount) {
    let lottos = [];
    for (let i = 0; i < lottoCount; i += 1) {
      const numbers = sortNumber(randomNumbers());
      lottos.push(numbers);
    }
    return lottos;
  },
  LottoGenerator(randomLotto) {
    let lottoObjects = [];
    randomLotto.forEach((lottos) => {
      lottoObjects.push(new Lotto(lottos));
    });
    return lottoObjects;
  },
};
const sortNumber = (numbers) => {
  return [...numbers].sort((a, b) => a - b);
};
