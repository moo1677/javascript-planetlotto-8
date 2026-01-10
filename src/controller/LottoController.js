import { LOTTO_CONSTANTS, PRICE_INFO } from '../constants/format.js';
import LottoResultCalculator from '../service/LottoResultCalculator.js';
import { LottoCreator } from '../util/LottoCreator.js';
import Lotto from '../model/Lotto.js';

export default class LottoController {
  #lottos;
  #winnerLotto;
  #bonusNumber;
  #lottoResultArray;
  #lottoResult;
  constructor() {
    this.#lottos = [];
    this.#lottoResultArray = [];
    this.#lottoResult = [0, 0, 0, 0, 0, 0];
  }
  runLottoMachine(winnerLotto, bonusNumber) {
    this.#winnerLotto = winnerLotto;
    this.#bonusNumber = bonusNumber;
    this.#calculatorLotto();
    const result = this.#setResult();
    return result;
  }
  createRandomLotto(purchaseAmount) {
    const randomLotto = LottoCreator.setLotto(
      purchaseAmount / LOTTO_CONSTANTS.PRICE,
    );
    randomLotto.forEach((lottos) => {
      this.#lottos.push(new Lotto(lottos));
    });
    return randomLotto;
  }
  #calculatorLotto() {
    this.#lottos.forEach((lotto) => {
      this.#lottoResultArray.push(
        LottoResultCalculator.getRank(
          lotto,
          this.#winnerLotto,
          this.#bonusNumber,
        ),
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
