import { InputView, OutputView } from '../view.js';
import LottoResultCalculator from '../service/LottoResultCalculator.js';
import { LottoCreator } from '../util/LottoCreator.js';
import { Validation } from '../util/Validation.js';

export default class LottoController {
  #lottos;
  #winnerLotto;
  #bonusNumber;
  #lottoResultArray;
  #lottoResult;
  constructor() {
    this.#lottos = [];
    this.#lottoResultArray = [];
    this.#lottoResult = new Map();
  }

  async runLottoMachine() {
    const purchaseAmount = await this.#getValidPurchaseAmount();

    const randomLotto = LottoCreator.setLotto(purchaseAmount);
    this.#lottos = LottoCreator.LottoGenerator(randomLotto);
    this.#printLotto(randomLotto);

    this.#winnerLotto = await this.#getValidWinningLotto();
    this.#bonusNumber = await this.#getValidBonusNumber();

    this.#calculatorLotto();
    this.#printResult(this.#lottoResult);
  }

  async #getValidPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmountNumber = await InputView.askAmount();
        Validation.validateLottoCount(purchaseAmountNumber);
        return purchaseAmountNumber;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }
  async #getValidWinningLotto() {
    while (true) {
      try {
        const winningNumberString = await InputView.askWinningLotto();
        Validation.validateLottoNumber(winningNumberString);
        return winningNumberString;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }
  async #getValidBonusNumber() {
    while (true) {
      try {
        const bonusNumberAsNumber = await InputView.askBonusNumber();
        Validation.validateBonusNumber(bonusNumberAsNumber, this.#winnerLotto);
        return bonusNumberAsNumber;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
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
    for (let rank = 0; rank <= 6; rank++) {
      this.#lottoResult.set(rank, 0);
    }
    this.#lottoResultArray.forEach((rank) => {
      this.#lottoResult.set(rank, this.#lottoResult.get(rank) + 1);
    });
  }
  #printResult(lottoResult) {
    OutputView.printResult(lottoResult);
  }
  #printLotto(randomLottos) {
    OutputView.printPurchasedLottos(randomLottos);
  }
}
