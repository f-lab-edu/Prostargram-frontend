import { useMutation } from '@tanstack/react-query';
import { defaultInstance } from './httpRequest';

const postEmailConfirm = async (email: string) => {
  // const result = defaultInstance({
  //   method: 'post',
  //   url: `/verification/email?email=${email}`,
  // });

  console.log(email);
  const result = {
    isSuccess: true,
    code: 200,
    message: '성공적으로 요청하였습니다.',
  };
  // const result = await new Promise((res) => {
  //   const data = {
  //     isSuccess: true,
  //     code: 200,
  //     message: '성공적으로 요청하였습니다.',
  //   };

  //   setTimeout(() => res(data), 3000);
  // });

  console.log(result);

  return result;
};

const useEamilConfirm = () => {
  return useMutation({
    mutationFn: (email: string) =>
      defaultInstance({
        method: 'post',
        url: `/verification/email?email=${email}`,
      }),
  });
};

export { postEmailConfirm, useEamilConfirm };
