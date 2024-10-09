const BASE_WIDTH = 30;
const WIDTH_PER_CHAR = 8;

const calculateWidth = (length: number) => {
  if (length * WIDTH_PER_CHAR > BASE_WIDTH) {
    return `${BASE_WIDTH + length * WIDTH_PER_CHAR}px`;
  }

  return `5rem`;
};

export { calculateWidth };
