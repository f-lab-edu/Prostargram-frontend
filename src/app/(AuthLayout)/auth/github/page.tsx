'use client';

// import { useRouter } from 'next/navigation';
import { KeyboardEvent } from 'react';

import Logo from '@/components/common/Logo';
import Field from '@/components/common/Field';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import validators from '@/utils/validate';
import useSignUpState, { ISignUpFormValueType } from '@/hooks/useSignUpState';

import { ERROR_MESSAGE } from '@/constants/errorMessage';
import { useSignupUser } from '@/api/mutations/sign-up';
import { postLogin } from '@/api/auth';

import styles from './page.module.scss';

const GithubSignupPage = () => {
  // const router = useRouter();

  const {
    signupToken,
    register,
    watch,
    setError,
    resetField,
    formState: { errors, isValid },
    handleSubmit,
    isRequestEmailPending,
    isRequestConfirmPending,
    isDuplicateUsernamePending,
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
  } = useSignUpState();

  const preventEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const { isPending: isRequestSignupPending, mutate: requestSignupUser } =
    useSignupUser({
      onSuccess: async (res) => {
        const [email, password] = watch(['email', 'password']);

        if (res.isSuccess) {
          const result = await postLogin({ email, password });
          console.log(result);
        }
      },
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

  const onSubmit = async (values: ISignUpFormValueType) => {
    const { email, password, username } = values;

    const payload = {
      email,
      password,
      username,
      ...signupToken,
    };

    console.log('payload', payload);
    await requestSignupUser(payload);
    // router.push('/auth/info');
  };

  return (
    <div className={styles.container}>
      <Logo />

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
                  onClick={requestConfirmNumber}
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
                  changeConfirmState={changeConfirmState}
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
                  onClick={checkConfirmNumber}
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
                onClick={checkUsername}
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
