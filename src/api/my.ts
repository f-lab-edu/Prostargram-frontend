import instance from './http';

export const updateMyLinks = async (myLinks: (File | string)[]) => {
  try {
    const result = await instance<string[]>('/my/link', {
      method: 'POST',
      body: JSON.stringify(myLinks),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};
