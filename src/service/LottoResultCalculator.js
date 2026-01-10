export default class LottoResultCalculator {
  static getRank(lottoNumbers, winningLotto) {
    const winningNumber = winningLotto.getLottoNumber();
    const bonusNumber = winningLotto.getBonusNumber();

    const matchCount = this.checkMatchCount(lottoNumbers, winningNumber);
    const hasBonus = this.checkHasBonus(lottoNumbers, bonusNumber);
    return this.getTotalRank(matchCount, hasBonus);
  }
  static checkMatchCount(lottoNumbers, winningNumber) {
    return lottoNumbers.filter((number) => winningNumber.includes(number))
      .length;
  }
  static checkHasBonus(lottoNumbers, bonusNumber) {
    return lottoNumbers.includes(bonusNumber);
  }
  static getTotalRank(matchCount, hasBonus) {
    if (matchCount === 5) return 1;
    if (matchCount === 4 && hasBonus) return 2;
    if (matchCount === 4) return 3;
    if (matchCount === 3) return 4;
    if (matchCount === 2) return 5;
    return 0;
  }
}
