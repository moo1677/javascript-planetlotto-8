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
    this.#lottoResult = [0, 0, 0, 0, 0, 0];
  }

  async runLottoMachine() {
    const purchaseAmount = await this.#getValidPurchaseAmount();

    const lottoArray = LottoCreator.setLotto(purchaseAmount);
    this.#printLotto(lottoArray);
    this.lottos = LottoCreator.LottoGenerator(lottoArray);

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
  //   createRandomLotto(purchaseAmount) {
  //     const randomLotto = LottoCreator.setLotto(
  //       purchaseAmount / LOTTO_CONSTANTS.PRICE,
  //     );
  //     randomLotto.forEach((lottos) => {
  //       this.#lottos.push(new Lotto(lottos));
  //     });
  //     return randomLotto;
  //   }
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
    this.#lottoResult = this.#setResult();
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
  #printResult(lottoResult) {
    OutputView.printResult(lottoResult);
  }
  #printLotto(randomLottos) {
    OutputView.printPurchasedLottos(randomLottos);
  }
}
