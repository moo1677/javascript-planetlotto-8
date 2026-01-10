import { InputView } from './view.js';
import { OutputView } from './view.js';
import LottoController from './controller/LottoController.js';
import { Validation } from './util/Validation.js';
import { Console } from '@woowacourse/mission-utils';

class App {
  winningNumber;
  bonusNumber;
  async run() {
    const purchaseAmount = await this.#getValidPurchaseAmount();
    const manager = new LottoController();

    const randomLotto = manager.createRandomLotto(purchaseAmount);
    this.#printLotto(randomLotto);

    this.winningNumber = await this.#getValidWinningLotto();
    this.bonusNumber = await this.#getValidBonusNumber();

    const lottoResult = manager.runLottoMachine(this.winningNumber);
    this.#printResult(lottoResult);
  }
  async #getValidPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmountNumber = await InputView.askAmount();
        Validation.validateLottoCount(purchaseAmountNumber);
        return purchaseAmountNumber;
      } catch (error) {
        Console.print(error.message);
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
        Console.print(error.message);
      }
    }
  }
  async #getValidBonusNumber() {
    while (true) {
      try {
        const bonusNumberAsNumber = await InputView.askBonusNumber();
        Validation.validateBonusNumber(bonusNumberAsNumber, this.winningNumber);
        return bonusNumberAsNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
  #printResult(lottoResult) {
    OutputView.printResult(lottoResult);
  }
  #printLotto(randomLottos) {
    OutputView.printPurchasedLottos(randomLottos);
  }
}

export default App;
