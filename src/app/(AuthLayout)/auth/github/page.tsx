'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect } from 'react';

import Logo from '@/components/common/Logo';
import Field from '@/components/common/Field';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import validators from '@/utils/validate';
import useSignUpState, {
  CONFIRM_STATES,
  ISignUpFormValueType,
} from '@/hooks/useSignUpState';
import useSignupMutation from '@/hooks/useSignUpMutation';
import { postLogin } from '@/api/auth';
import { saveAccessToken, saveRefreshToken } from '@/utils/manageToken';

import styles from './page.module.scss';

const GithubSignupPage = () => {
  const router = useRouter();
  const formMethods = useForm<ISignUpFormValueType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      confirm: '',
      password: '',
      repassword: '',
      username: '',
    },
  });

  const {
    watch,
    register,
    resetField,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  const {
    signupToken,
    isEmailConfirmed,
    isEmailPending,
    isEmailRequest,
    isEmailRetry,
    isUsernameConfirmed,
    changeConfirmCodeState,
    changeUsernameState,
    changeSignupToken,
  } = useSignUpState();

  const {
    isRequestEmailPending,
    isRequestConfirmPending,
    isDuplicateUsernamePending,
    isRequestSignupPending,
    requestCodeByEmail,
    requestConfirmCode,
    requestCheckDuplicateUsername,
    requestSignupUser,
  } = useSignupMutation({
    formMethods,
    changeSignupToken,
    changeConfirmCodeState,
    changeUsernameState,
  });

  const preventEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const resetEmail = () => {
    resetField('email');
    resetField('confirm');
    changeConfirmCodeState(CONFIRM_STATES.PENDING);
  };

  const onSubmit = (values: ISignUpFormValueType) => {
    const { email, password, username } = values;

    const payload = {
      email,
      password,
      username,
      ...signupToken,
    };

    requestSignupUser(payload, {
      onSuccess: async (res) => {
        if (res.isSuccess) {
          const authResults = await postLogin({ email, password });
          const { result, isSuccess } = authResults;

          if (isSuccess && result) {
            const { accessToken, refreshToken } = result;
            saveAccessToken(accessToken);
            saveRefreshToken(refreshToken);
            router.push('/auth/info');
          }
        }
      },
    });
  };

  const [password, repassword] = watch(['password', 'repassword']);

  useEffect(() => {
    if (password !== '' && password === repassword) {
      clearErrors(['password', 'repassword']);
    }
  }, [password, repassword, clearErrors]);

  return (
    <div className={styles.container}>
      <Logo isGoHome={false} />

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <p className={styles.sub_title}>회원가입</p>
          <Field>
            <Field.Label htmlFor="email">
              <Field.Emphasize>*</Field.Emphasize>
              이메일
            </Field.Label>
            <Field.Box>
              <Input
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요."
                maxLength={30}
                disabled={!isEmailPending}
                onKeyDown={preventEnter}
                state={(errors.email?.message && 'fail') || 'normal'}
                {...register('email', validators.email)}
              />
              {(isEmailPending || isEmailRetry) && (
                <Button
                  type="button"
                  className={styles.button}
                  onClick={() => requestCodeByEmail(watch('email'))}
                  disabled={
                    !watch('email').length ||
                    !!errors.email?.message ||
                    isRequestEmailPending
                  }
                >
                  {isEmailPending && !isRequestEmailPending && '인증 요청'}
                  {isEmailRetry && !isRequestEmailPending && '재요청'}
                  {isRequestEmailPending && '요청 중...'}
                </Button>
              )}
              {isEmailRequest && (
                <Field.TimerButton
                  type="button"
                  className={styles.button}
                  expireTimeEvent={() => changeConfirmCodeState('retry')}
                  isConfirm={isEmailConfirmed}
                  timerDuration={300_000} // 5분
                  disabled={isRequestEmailPending || !isEmailRetry}
                />
              )}
              {isEmailConfirmed && (
                <Button
                  type="button"
                  className={styles.button}
                  onClick={resetEmail}
                >
                  재설정
                </Button>
              )}
            </Field.Box>
            <Field.ErrorMessage>{errors.email?.message}</Field.ErrorMessage>
          </Field>

          {!isEmailPending && (
            <Field>
              <Field.Label htmlFor="confirm">
                <Field.Emphasize>*</Field.Emphasize>
                인증번호
              </Field.Label>
              <Field.Box>
                <Input
                  id="confirm"
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  maxLength={7}
                  disabled={isEmailConfirmed}
                  state={(errors.confirm?.message && 'fail') || 'normal'}
                  onKeyDown={preventEnter}
                  {...register('confirm', validators.confirm)}
                />
                <Button
                  type="button"
                  className={styles.button}
                  onClick={() =>
                    requestConfirmCode({
                      email: watch('email'),
                      code: watch('confirm'),
                    })
                  }
                  disabled={
                    isRequestConfirmPending || isEmailRetry || isEmailConfirmed
                  }
                >
                  {!isRequestConfirmPending && !isEmailConfirmed && '인증 확인'}
                  {isEmailConfirmed && '인증 완료'}
                  {isRequestConfirmPending && '인증 중...'}
                </Button>
              </Field.Box>
              <Field.ErrorMessage>{errors.confirm?.message}</Field.ErrorMessage>
            </Field>
          )}

          <Field>
            <Field.Label htmlFor="username">
              <Field.Emphasize>*</Field.Emphasize>
              닉네임
            </Field.Label>
            <Field.Box>
              <Input
                id="username"
                type="text"
                placeholder="닉네임을 입력해주세요."
                minLength={2}
                maxLength={16}
                state={errors.username?.message ? 'fail' : 'normal'}
                disabled={isUsernameConfirmed}
                onKeyDown={preventEnter}
                {...register('username', validators.username)}
              />
              <Button
                type="button"
                className={styles.button}
                onClick={() => requestCheckDuplicateUsername(watch('username'))}
                disabled={
                  !watch('username')?.length ||
                  isDuplicateUsernamePending ||
                  !!errors.username?.message ||
                  isUsernameConfirmed
                }
              >
                {isDuplicateUsernamePending ? '확인 중...' : '중복 확인'}
              </Button>
            </Field.Box>
            <Field.ErrorMessage>{errors.username?.message}</Field.ErrorMessage>
          </Field>
        </div>

        <Button disabled={!isValid || isRequestSignupPending}>
          {isRequestSignupPending ? '...' : '다음 단계로'}
        </Button>
      </form>
    </div>
  );
};

export default GithubSignupPage;
