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
    validateRange(bonusNumber);
    validateNoDuplicates(bonusNumber, winnerLotto);
  },
  //로또 번호를 검증합니다
  validateLottoNumber(numbers) {
    lottoValidateLength(numbers);
    lottoValidateRange(numbers);
    lottoValidateNoDuplicates(numbers);
  },
};
const validateRange = (bonusNumber) => {
  const isValid = (number) =>
    Number.isInteger(number) &&
    number >= LOTTO_CONSTANTS.MIN_NUMBER &&
    number <= LOTTO_CONSTANTS.MAX_NUMBER;
  if (!isValid(bonusNumber))
    throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
};
const validateNoDuplicates = (bonusNumber, winnerLotto) => {
  if (winnerLotto.includes(bonusNumber))
    throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
};

const lottoValidateLength = (numbers) => {
  if (numbers.length !== LOTTO_CONSTANTS.NUMBER_COUNT) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_COUNT);
  }
};
const lottoValidateRange = (numbers) => {
  const isValid = (number) =>
    Number.isInteger(number) &&
    number >= LOTTO_CONSTANTS.MIN_NUMBER &&
    number <= LOTTO_CONSTANTS.MAX_NUMBER;

  if (numbers.some((number) => !isValid(number)))
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_RANGE);
};

const lottoValidateNoDuplicates = (numbers) => {
  const uniqueNumbers = new Set(numbers);
  if (uniqueNumbers.size !== numbers.length)
    throw new Error(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
};
