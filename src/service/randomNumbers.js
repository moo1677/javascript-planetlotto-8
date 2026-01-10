import { LOTTO_CONSTANTS } from '../constants/format.js';
import { MissionUtils } from '@woowacourse/mission-utils';
const randomNumbers = () => {
  const lottoNumbers = MissionUtils.Random.pickUniqueNumbersInRange(
    LOTTO_CONSTANTS.MIN_NUMBER,
    LOTTO_CONSTANTS.MAX_NUMBER,
    LOTTO_CONSTANTS.NUMBER_COUNT,
  );
  return lottoNumbers;
};
export default randomNumbers;
