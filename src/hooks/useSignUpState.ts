import { useState } from 'react';

export const CONFIRM_STATES = {
  PENDING: 'pending',
  REQUEST: 'request',
  CONFIRM: 'confirm',
  RETRY: 'retry',
} as const;

export type ConfirmStateType =
  (typeof CONFIRM_STATES)[keyof typeof CONFIRM_STATES];

export type SignUpTokenType = {
  emailToken: string;
  usernameToken: string;
};

export interface ISignUpFormValueType {
  email: string;
  password: string;
  repassword: string;
  username: string;
  confirm: string;
}

const useSignUpState = () => {
  const [signupToken, setSignupToken] = useState<SignUpTokenType>({
    emailToken: '',
    usernameToken: '',
  });
  const [confirmState, setConfirmState] = useState<ConfirmStateType>(
    CONFIRM_STATES.PENDING,
  );
  const [usernameState, setUsernameState] = useState<ConfirmStateType>(
    CONFIRM_STATES.PENDING,
  );

  const changeConfirmCodeState = (state: ConfirmStateType) =>
    setConfirmState(state);

  const changeUsernameState = (state: ConfirmStateType) =>
    setUsernameState(state);

  const changeSignupToken = ({
    tokenName,
    token,
  }: {
    tokenName: keyof SignUpTokenType;
    token: string;
  }) => setSignupToken((prev) => ({ ...prev, [tokenName]: token }));

  const isEmailPending = confirmState === CONFIRM_STATES.PENDING;
  const isEmailRequest = confirmState === CONFIRM_STATES.REQUEST;
  const isEmailConfirmed = confirmState === CONFIRM_STATES.CONFIRM;
  const isEmailRetry = confirmState === CONFIRM_STATES.RETRY;

  const isUsernameConfirmed = usernameState === CONFIRM_STATES.CONFIRM;

  return {
    signupToken,
    confirmState,
    usernameState,
    isEmailConfirmed,
    isEmailPending,
    isEmailRequest,
    isEmailRetry,
    isUsernameConfirmed,
    changeConfirmCodeState,
    changeUsernameState,
    changeSignupToken,
  };
};

export default useSignUpState;
