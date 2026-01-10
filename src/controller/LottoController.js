import randomNumbers from '../service/randomNumbers.js';
import { LOTTO_CONSTANTS, PRICE_INFO } from '../constants/format.js';
import LottoResultCalculator from '../service/LottoResultCalculator.js';
import Lotto from '../model/Lotto.js';

export default class LottoController {
  #purchaseAmount;
  #lottoCount;
  #lottos;
  #winnerLotto;
  #lottoResultArray;
  #lottoResult;
  constructor(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
    this.#lottoCount = purchaseAmount / LOTTO_CONSTANTS.PRICE;
    this.#lottos = [];
    this.#lottoResultArray = [];
    this.#lottoResult = [0, 0, 0, 0, 0, 0];
  }
  runLottoMachine(winnerLotto) {
    this.#winnerLotto = winnerLotto;
    this.#calculatorLotto();
    const result = this.#setResult();

    return result;
  }
  #createLotto() {
    for (let i = 0; i < this.#lottoCount; i += 1) {
      const numbers = randomNumbers();
      const lotto = new Lotto(numbers);
      this.#lottos.push(lotto.getNumber());
    }
  }
  getRandomLotto() {
    this.#createLotto();
    const randomLotto = this.#lottos;
    return randomLotto;
  }
  #calculatorLotto() {
    this.#lottos.forEach((lotto) => {
      this.#lottoResultArray.push(
        LottoResultCalculator.getRank(lotto, this.#winnerLotto),
      );
    });
    this.#statisticsLotto();
  }
  #statisticsLotto() {
    this.#lottoResultArray.forEach((rank) => {
      this.#lottoResult[rank] += 1;
    });
  }
  #setResult() {
    let lottoResult = new Map();
    let sum = 0;
    this.#lottoResult.map((rank) => {
      lottoResult.set(sum, rank);
      sum = sum + 1;
    });
    return lottoResult;
  }
}
