import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { REG_EXP } from '@/constants/regExp';

const CONFIRM_STATES = {
  PENDING: 'pending',
  REQUEST: 'request',
  CONFIRM: 'confirm',
};

export interface ISignUpFormValueType {
  email: string;
  password: string;
  repassword: string;
  nickname: string;
  confirm: string;
}

const useSignUpState = <T extends ISignUpFormValueType>() => {
  const [confirmState, setConfirmState] = useState(CONFIRM_STATES.PENDING);
  const [nicknameState, setNicknameState] = useState(CONFIRM_STATES.PENDING);

  const formMethods = useForm<T | ISignUpFormValueType>();
  const { watch, setError, clearErrors } = formMethods;

  const isEmailConfirmed = confirmState === CONFIRM_STATES.CONFIRM;
  const isEmailPending = confirmState === CONFIRM_STATES.PENDING;

  const isNicknameConfirmed = nicknameState === CONFIRM_STATES.CONFIRM;

  const requestConfirmNumber = async () => {
    const email = watch('email');
    if (!email) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return;
    }
    if (!REG_EXP.EMAIL.test(email)) {
      setError('email', {
        type: 'validate',
        message: '이메일 형식이 알맞지 않습니다.',
      });
      return;
    }
    clearErrors('email');
    setConfirmState(CONFIRM_STATES.REQUEST);
  };

  const checkConfirmNumber = async () => {
    const confirm = watch('confirm');
    if (!confirm) {
      setError('confirm', {
        type: 'required',
        message: '인증번호를 입력해주세요.',
      });
      return;
    }
    if (confirm.length < 6) {
      setError('confirm', { type: 'min', message: '인증번호는 6자리 입니다.' });
      return;
    }
    if (!REG_EXP.CONFIRM.test(confirm)) {
      setError('confirm', {
        type: 'validate',
        message: '인증번호는 숫자로만 입력해야 합니다.',
      });
      return;
    }
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
    ...formMethods,
    confirmState,
    nicknameState,
    isEmailConfirmed,
    isEmailPending,
    isNicknameConfirmed,
    requestConfirmNumber,
    checkConfirmNumber,
    checkNickname,
  };
};

export default useSignUpState;
