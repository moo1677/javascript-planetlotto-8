export default class WinningLotto {
  #lotto;
  #bonusNumber;
  constructor(winningLotto, bonusNumber) {
    this.#lotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }
  getLottoNumber() {
    return this.#lotto.getNumber();
  }
  getBonusNumber() {
    return this.#bonusNumber;
  }
}
