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

const timeFormatter = (time: number) => {
  const totalSeconds = time / 1_000; // 초로 변경
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds - minutes * 60);

  if (minutes <= 0) {
    const returnString = `0:${seconds.toString().padStart(2, '0')}`;
    return returnString;
  }

  const returnString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return returnString;
};

export {
  compactNumberFormatter,
  digitNumberFormatter,
  compactTimeFormatter,
  timeFormatter,
};
