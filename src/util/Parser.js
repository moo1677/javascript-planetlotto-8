export const Parser = {
  parsePurchaseAmount(amountString) {
    return Number(amountString.trim());
  },
  parseWinningNumbers(numberString) {
    return winningNumberString.split(',').map(Number);
  },
  parseBonusNumber(bonusNumber) {
    return Number(bonusNumber.trim());
  },
};
