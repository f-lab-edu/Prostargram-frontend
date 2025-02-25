const requestPromiseAll = async <T>(
  arr: T[],
  callback: (params: T, index: number, array: T[]) => unknown,
) => {
  const result = await Promise.all(arr.map(callback));
  return result;
};

export { requestPromiseAll };
