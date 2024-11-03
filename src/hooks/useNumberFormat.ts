const useNumberFormat = () => {
  const formatWithCommas = (num: number) => {
    return num.toLocaleString();
  };

  return {
    formatWithCommas,
  };
};

export default useNumberFormat;
