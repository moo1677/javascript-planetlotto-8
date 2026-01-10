import { InputView } from './view.js';
import { OutputView } from './view.js';
import LottoController from './controller/LottoController.js';
import Lotto from './model/Lotto.js';
import WinningLotto from './model/WinningLotto.js';
import { Validation } from './util/Validation.js';
import { Console } from '@woowacourse/mission-utils';
class App {
  async run() {
    const purchaseAmount = await this.#getValidPurchaseAmount();
    const manager = new LottoController(purchaseAmount);

    const randomLotto = manager.getRandomLotto();
    this.#printLotto(randomLotto);

    const mainLotto = await this.#getValidWinningLotto();
    const bonusNumber = await this.#getValidBonusNumber(mainLotto);

    const winnerLotto = new WinningLotto(mainLotto, bonusNumber);
    const lottoResult = manager.runLottoMachine(winnerLotto);
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
        const winningNumber = await InputView.askWinningLotto();
        const winningLotto = new Lotto(winningNumber);
        return winningLotto;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
  async #getValidBonusNumber(mainLotto) {
    while (true) {
      try {
        const bonusNumberAsNumber = await InputView.askBonusNumber();
        Validation.validateBonusNumber(
          bonusNumberAsNumber,
          mainLotto.getNumber(),
        );
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
