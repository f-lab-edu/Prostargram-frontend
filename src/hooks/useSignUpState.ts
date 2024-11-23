import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import {
  useConfirmUsernameDuplicate,
  useEamilConfirmMutation,
  useSelfSignUpMutation,
} from '@/api/mutations/sign-up';

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
  username: string;
  confirm: string;
}

const useSignUpState = <T extends ISignUpFormValueType>() => {
  const [signupToken, setSignupToken] = useState({
    emailToken: '',
    usernameToken: '',
  });
  const [confirmState, setConfirmState] = useState<ConfirmStateType>(
    CONFIRM_STATES.PENDING,
  );
  const [usernameState, setUsernameState] = useState<ConfirmStateType>(
    CONFIRM_STATES.PENDING,
  );

  const formMethods = useForm<T | ISignUpFormValueType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      confirm: '',
      password: '',
      repassword: '',
      username: '',
    },
  });
  const { watch, setError, clearErrors, resetField } = formMethods;

  const { isPending: isRequestEmailPending, mutate: requestCodeByEmail } =
    useSelfSignUpMutation({
      onSuccess: () => {
        setConfirmState(CONFIRM_STATES.REQUEST);
        clearErrors('email');
      },
      onError: (data) => {
        setError('email', {
          type: 'validate',
          message: data.message,
        });
      },
    });

  const { isPending: isRequestConfirmPending, mutate: requestConfirmCode } =
    useEamilConfirmMutation({
      onSuccess: (res) => {
        setSignupToken((prev) => ({
          ...prev,
          emailToken: res.result!.emailToken,
        }));
        setConfirmState(CONFIRM_STATES.CONFIRM);
        clearErrors(['email', 'confirm']);
      },
      onError: (data) => {
        setError('confirm', {
          type: 'validate',
          message: data.message,
        });
      },
    });

  const {
    isPending: isDuplicateUsernamePending,
    mutate: requestCheckDuplicateUsername,
  } = useConfirmUsernameDuplicate({
    onSuccess: (res) => {
      setSignupToken((prev) => ({
        ...prev,
        usernameToken: res.result!.usernameToken,
      }));
      setUsernameState(CONFIRM_STATES.CONFIRM);
      clearErrors('username');
    },
    onError: (data) => {
      setError('username', {
        type: 'validate',
        message: data.message,
      });
    },
  });

  const isEmailPending = confirmState === CONFIRM_STATES.PENDING;
  const isEmailRequest = confirmState === CONFIRM_STATES.REQUEST;
  const isEmailConfirmed = confirmState === CONFIRM_STATES.CONFIRM;
  const isEmailRetry = confirmState === CONFIRM_STATES.RETRY;

  const isUsernameConfirmed = usernameState === CONFIRM_STATES.CONFIRM;

  const [email, code, password, repassword, username] = watch([
    'email',
    'confirm',
    'password',
    'repassword',
    'username',
  ]);

  const changeConfirmState = (state: ConfirmStateType) =>
    setConfirmState(state);

  const changeUsernameState = (state: ConfirmStateType) =>
    setUsernameState(state);

  const requestConfirmNumber = async () => {
    await requestCodeByEmail(email);
  };

  const checkConfirmNumber = async () => {
    await requestConfirmCode({ email, code });
  };

  const checkUsername = async () => {
    clearErrors('username');
    await requestCheckDuplicateUsername(username);
  };

  const resetEmail = () => {
    resetField('email');
    resetField('confirm');
    setConfirmState('pending');
  };

  useEffect(() => {
    if (password !== '' && password === repassword) {
      clearErrors(['password', 'repassword']);
    }
  }, [password, repassword, clearErrors]);

  return {
    ...formMethods,
    signupToken,
    isRequestEmailPending,
    isRequestConfirmPending,
    isDuplicateUsernamePending,
    confirmState,
    usernameState,
    isEmailConfirmed,
    isEmailPending,
    isEmailRequest,
    isEmailRetry,
    isUsernameConfirmed,
    changeConfirmState,
    changeUsernameState,
    requestConfirmNumber,
    checkConfirmNumber,
    checkUsername,
    resetEmail,
  };
};

export default useSignUpState;
