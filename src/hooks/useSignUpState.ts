import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { REG_EXP } from '@/constants/regExp';
import { postEmailConfirm } from '@/api/sign-up';
import { useMutation } from '@tanstack/react-query';

const CONFIRM_STATES = {
  PENDING: 'pending',
  REQUEST: 'request',
  CONFIRM: 'confirm',
  RETRY: 'retry',
} as const;

export type ConfirmStateType =
  (typeof CONFIRM_STATES)[keyof typeof CONFIRM_STATES];

export interface ISignUpFormValueType {
  email: string;
  password: string;
  repassword: string;
  nickname: string;
  confirm: string;
}

const useSignUpState = <T extends ISignUpFormValueType>() => {
  const [confirmState, setConfirmState] = useState<ConfirmStateType>(
    CONFIRM_STATES.PENDING,
  );
  const [nicknameState, setNicknameState] = useState<ConfirmStateType>(
    CONFIRM_STATES.PENDING,
  );

  const formMethods = useForm<T | ISignUpFormValueType>({
    mode: 'onChange',
  });
  const { watch, setError, clearErrors } = formMethods;

  const { isPending: isRequestPending, mutate } = useMutation({
    mutationFn: (email: string) => postEmailConfirm(email),
    onSuccess: () => {
      clearErrors('email');
      setConfirmState(CONFIRM_STATES.REQUEST);
    },
    onError: (data) => {
      setError('email', {
        type: 'validate',
        message: data.message,
      });
    },
  });

  const isEmailPending = confirmState === CONFIRM_STATES.PENDING;
  const isEmailConfirmed = confirmState === CONFIRM_STATES.CONFIRM;
  const isEmailRetry = confirmState === CONFIRM_STATES.RETRY;

  const isNicknameConfirmed = nicknameState === CONFIRM_STATES.CONFIRM;

  const changeConfirmState = (state: ConfirmStateType) =>
    setConfirmState(state);

  const requestConfirmNumber = async (callback?: () => void) => {
    const email = watch('email');

    await mutate(email);

    if (callback) {
      callback();
    }
  };

  const checkConfirmNumber = async () => {
    clearErrors('confirm');
    setConfirmState(CONFIRM_STATES.CONFIRM);
  };

  const checkNickname = async () => {
    const nickname = watch('nickname');
    if (!nickname) {
      setError('nickname', {
        type: 'required',
        message: '닉네임을 입력해주세요.',
      });
      return;
    }
    if (nickname.length < 2) {
      setError('nickname', {
        type: 'minLength',
        message: '닉네임은 최소 2자 이상 작성해야 합니다.',
      });
      return;
    }
    if (nickname.length > 16) {
      setError('nickname', {
        type: 'maxLength',
        message: '닉네임은 최대 길이 16자 이하로 작성해야 합니다.',
      });
      return;
    }
    if (!REG_EXP.NICKNAME.test(nickname)) {
      setError('nickname', {
        type: 'validate',
        message: '닉네임은 영어(소문자),한글,숫자, _, .만 사용 가능합니다.',
      });
      return;
    }

    if (nickname === 'nickname') {
      setError('nickname', {
        type: 'validate',
        message: '중복된 닉네임입니다.',
      });
      return;
    }

    clearErrors('nickname');
    setNicknameState(CONFIRM_STATES.CONFIRM);
  };

  return {
    isRequestPending,
    ...formMethods,
    confirmState,
    nicknameState,
    isEmailConfirmed,
    isEmailPending,
    isEmailRetry,
    isNicknameConfirmed,
    changeConfirmState,
    requestConfirmNumber,
    checkConfirmNumber,
    checkNickname,
  };
};

export default useSignUpState;
