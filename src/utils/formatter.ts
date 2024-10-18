const compactNumberFormatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
}).format;

const digitNumberFormatter = Intl.NumberFormat('en-US', {
  notation: 'standard',
}).format;

export { compactNumberFormatter, digitNumberFormatter };
