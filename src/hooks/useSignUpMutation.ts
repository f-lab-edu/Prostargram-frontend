import { UseFormReturn } from 'react-hook-form';

import {
  useSelfSignUpMutation,
  useEamilConfirmMutation,
  useConfirmUsernameDuplicate,
  useSignupUser,
} from '@/api/mutations/sign-up';
import { ERROR_MESSAGE } from '@/constants/errorMessage';
import {
  CONFIRM_STATES,
  ConfirmStateType,
  ISignUpFormValueType,
  SignUpTokenType,
} from './useSignUpState';

interface UseSignupMutationParamType {
  formMethods: UseFormReturn<ISignUpFormValueType>;
  changeConfirmState: (state: ConfirmStateType) => void;
  changeUsernameState: (state: ConfirmStateType) => void;
  changeSignupToken: (token: {
    tokenName: keyof SignUpTokenType;
    token: string;
  }) => void;
}

const useSignupMutation = ({
  formMethods,
  changeConfirmState,
  changeUsernameState,
  changeSignupToken,
}: UseSignupMutationParamType) => {
  const { clearErrors, setError, watch, resetField } = formMethods;

  const { isPending: isRequestEmailPending, mutate: requestCodeByEmail } =
    useSelfSignUpMutation({
      onSuccess: () => {
        changeConfirmState(CONFIRM_STATES.REQUEST);
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
        changeSignupToken({
          tokenName: 'emailToken',
          token: res.result!.emailToken,
        });
        changeConfirmState(CONFIRM_STATES.CONFIRM);
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
      changeSignupToken({
        tokenName: 'usernameToken',
        token: res.result!.usernameToken,
      });
      changeUsernameState(CONFIRM_STATES.CONFIRM);
      clearErrors('username');
    },
    onError: (data) => {
      setError('username', {
        type: 'validate',
        message: data.message,
      });
    },
  });

  const { isPending: isRequestSignupPending, mutate: requestSignupUser } =
    useSignupUser({
      onSuccess: async () => {},
      onError: (err) => {
        const [password] = watch('password');
        if (
          err.message.includes('이메일 형식') ||
          err.message.includes('이메일 인증')
        ) {
          setError('email', { type: 'validate', message: err.message });
          changeConfirmState('pending');
          resetField('confirm');
        }
        if (err.message.includes('크기가 8에서')) {
          setError('password', {
            type: 'validate',
            message:
              password.length < 8
                ? ERROR_MESSAGE.PASSWORD.MIN_LENGTH
                : ERROR_MESSAGE.PASSWORD.MAX_LENGTH,
          });
        }
        if (err.message.includes('비밀번호 형식')) {
          setError('password', {
            type: 'validate',
            message: ERROR_MESSAGE.PASSWORD.FORMAT_IS_NOT_CORRECT,
          });
        }
        if (err.message.includes('닉네임을 입력')) {
          setError('username', {
            type: 'required',
            message: ERROR_MESSAGE.USERNAME.REQUIRED,
          });
          changeUsernameState('pending');
        }
        if (err.message.includes('닉네임의 최대 길이')) {
          setError('username', {
            type: 'maxLength',
            message: ERROR_MESSAGE.USERNAME.MAX_LENGTH,
          });
          changeUsernameState('pending');
        }
        if (err.message.includes('닉네임 중복')) {
          setError('username', { type: 'validate', message: err.message });
          changeUsernameState('pending');
        }
      },
    });

  return {
    isRequestEmailPending,
    isRequestConfirmPending,
    isDuplicateUsernamePending,
    isRequestSignupPending,
    requestCodeByEmail,
    requestConfirmCode,
    requestCheckDuplicateUsername,
    requestSignupUser,
  };
};

export default useSignupMutation;
