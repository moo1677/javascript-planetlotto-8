import { LOTTO_CONSTANTS } from '../constants/format.js';
import { ERROR_MESSAGE } from '../constants/message.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#validateLength(numbers);
    this.#validateRange(numbers);
    this.#validateNoDuplicates(numbers);
  }

  #validateLength(numbers) {
    if (numbers.length !== LOTTO_CONSTANTS.NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_COUNT);
    }
  }
  #validateRange(numbers) {
    const isValid = (number) =>
      Number.isInteger(number) &&
      number >= LOTTO_CONSTANTS.MIN_NUMBER &&
      number <= LOTTO_CONSTANTS.MAX_NUMBER;

    if (numbers.some((number) => !isValid(number)))
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_RANGE);
  }

  #validateNoDuplicates(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length)
      throw new Error(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
  }
  // getNumber() {
  //   /*
  //   return this.#numbers 로 반환할 경우 원본 메모리주소를 그대로 반환하기 때문에 캡슐화가 깨질 수 있다.
  //   따라서 스프레드 연산자[...array] 를 사용하여 복사본을 안전하게 return 할 수 있다.
  //   */
  //   return [...this.#numbers];
  // }
  matchCount(winningNumber) {
    const matchNumber = this.#numbers.filter((number) =>
      winningNumber.includes(number),
    ).length;
    return matchNumber;
  }
  containBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
