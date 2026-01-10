import { LOTTO_CONSTANTS } from '../constants/format.js';
import { ERROR_MESSAGE } from '../constants/message.js';

export const Validation = {
  //구입 금액을 검증합니다
  validateLottoCount(purchase) {
    const isValid =
      Number.isInteger(purchase) &&
      purchase > 0 &&
      purchase % LOTTO_CONSTANTS.PRICE === 0;
    if (!isValid) throw new Error(ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT);
  },
  //보너스 번호를 검증합니다
  validateBonusNumber(bonusNumber, winnerLotto) {
    this.validateRange(bonusNumber);
    this.validateNoDuplicates(bonusNumber, winnerLotto);
  },
  validateRange(bonusNumber) {
    const isValid = (number) =>
      Number.isInteger(number) &&
      number >= LOTTO_CONSTANTS.MIN_NUMBER &&
      number <= LOTTO_CONSTANTS.MAX_NUMBER;
    if (!isValid(bonusNumber))
      throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
  },
  validateNoDuplicates(bonusNumber, winnerLotto) {
    if (winnerLotto.includes(bonusNumber))
      throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
  },
};
