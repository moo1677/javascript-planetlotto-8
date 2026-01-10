export const LOTTO_CONSTANTS = {
  PRICE: 500,
  MIN_NUMBER: 1,
  MAX_NUMBER: 30,
  NUMBER_COUNT: 5,
};
export const RANK = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
  FOURTH: 'FOURTH',
  FIFTH: 'FIFTH',
};
export const PRICE_INFO = {
  [RANK.FIFTH]: { key: 5, prize: 5000, text: '3개 일치' },
  [RANK.FOURTH]: { key: 4, prize: 50000, text: '4개 일치' },
  [RANK.THIRD]: { key: 3, prize: 1500000, text: '5개 일치' },
  [RANK.SECOND]: { key: 2, prize: 30000000, text: '5개 일치, 보너스 볼 일치' },
  [RANK.FIRST]: { key: 1, prize: 2000000000, text: '6개 일치' },
};
