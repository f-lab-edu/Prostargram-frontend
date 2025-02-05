const requestPromiseAll = async <T>(
  arr: T[],
  callback: (params: T, index: number, array: T[]) => Promise<unknown>,
) => {
  return Promise.all(arr.map(callback));
};

export { requestPromiseAll };
