export default class LottoResultCalculator {
  static getRank(lottoNumbers, winningNumber, bonusNumber) {
    return this.getTotalRank(
      lottoNumbers.matchCount(winningNumber),
      lottoNumbers.containBonusNumber(bonusNumber),
    );
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
