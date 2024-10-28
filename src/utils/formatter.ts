const relativeTimeFormatter = new Intl.RelativeTimeFormat('ko', {
  numeric: 'always',
});

const compactDateFormatter = Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'short',
}).format;

const compactNumberFormatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
}).format;

const digitNumberFormatter = Intl.NumberFormat('en-US', {
  notation: 'standard',
}).format;

const compactTimeFormatter = (targetDate: string) => {
  const nowSeconds = +new Date() / 1000;
  const targetSeconds = +new Date(targetDate) / 1000;

  const minutes = Math.ceil(nowSeconds / 60 - targetSeconds / 60) - 1;
  const hours =
    Math.ceil(nowSeconds / (60 * 60) - targetSeconds / (60 * 60)) - 1;
  const days =
    Math.ceil(nowSeconds / (60 * 60 * 24) - targetSeconds / (60 * 60 * 24)) - 1;

  if (hours < 1 && minutes >= 5) {
    return relativeTimeFormatter.format(-minutes, 'minutes');
  }

  if (hours >= 1 && hours < 24) {
    return relativeTimeFormatter.format(-hours, 'hours');
  }

  if (days < 7 && hours >= 24) {
    return relativeTimeFormatter.format(-days, 'days');
  }

  if (days >= 7) {
    return compactDateFormatter(new Date(targetDate));
  }

  return '방금 전';
};

export { compactNumberFormatter, digitNumberFormatter, compactTimeFormatter };
