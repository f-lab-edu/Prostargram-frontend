'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect } from 'react';

import Logo from '@/components/common/Logo';
import Input from '@/components/common/Input';
import Field from '@/components/common/Field';
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
import SignupField from './components/SignupField';

const SignupPage = () => {
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
    formState: { errors, isValid },
    handleSubmit,
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

  const [email, confirmCode, password, repassword, username] = watch([
    'email',
    'confirm',
    'password',
    'repassword',
    'username',
  ]);

  const disableButtonForEmailAuthentication =
    !email.length || !!errors.email?.message || isRequestEmailPending;

  const isDisableNextStepButton =
    !isEmailConfirmed ||
    !isUsernameConfirmed ||
    !isValid ||
    isRequestSignupPending;

  const handleKeyDown =
    (callback: () => void) => (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        callback();
      }
    };

  const resetEmail = () => {
    resetField('email');
    resetField('confirm');
    changeConfirmCodeState(CONFIRM_STATES.PENDING);
  };

  const onSubmit = (values: ISignUpFormValueType) => {
    const loginInfo = {
      email: values.email,
      password: values.password,
    };

    const payload = {
      username: values.username,
      ...loginInfo,
      ...signupToken,
    };

    requestSignupUser(payload, {
      onSuccess: async (res) => {
        if (res.isSuccess) {
          const { isSuccess, result } = await postLogin(loginInfo);

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

  useEffect(() => {
    if (
      password !== '' &&
      (!errors.password?.message || !errors.repassword?.message) &&
      password === repassword
    ) {
      clearErrors(['password', 'repassword']);
    }
  }, [
    password,
    repassword,
    errors.password?.message,
    errors.repassword?.message,
    clearErrors,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.logo_box}>
        <Logo isGoHome={false} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.sub_title}>회원가입</p>
        <SignupField
          label="이메일"
          htmlFor="email"
          emphasizeString="*"
          errorMessage={errors.email?.message}
          content={
            <>
              <Input
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요."
                maxLength={30}
                disabled={!isEmailPending || isRequestEmailPending}
                onKeyDown={handleKeyDown(
                  () =>
                    !disableButtonForEmailAuthentication &&
                    requestCodeByEmail(email),
                )}
                state={(errors.email?.message && 'fail') || 'normal'}
                {...register('email', validators.email)}
              />
              {(isEmailPending || isEmailRetry) && (
                <Button
                  type="button"
                  className={styles.button}
                  onClick={() => requestCodeByEmail(email)}
                  disabled={disableButtonForEmailAuthentication}
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
                  isConfirm={isEmailConfirmed}
                  timerDuration={300_000} // 5분
                  expireTimeEvent={() => changeConfirmCodeState('retry')}
                  disabled={isRequestEmailPending || !isEmailRetry}
                />
              )}
              {!isEmailPending && (
                <Button
                  type="button"
                  className={styles.button}
                  onClick={resetEmail}
                >
                  재설정
                </Button>
              )}
            </>
          }
        />

        {!isEmailPending && (
          <SignupField
            label="인증번호"
            htmlFor="confirm"
            emphasizeString="*"
            errorMessage={errors.confirm?.message}
            content={
              <>
                <Input
                  id="confirm"
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  maxLength={7}
                  disabled={isEmailConfirmed}
                  state={(errors.confirm?.message && 'fail') || 'normal'}
                  onKeyDown={handleKeyDown(
                    () =>
                      confirmCode.length === 7 &&
                      requestConfirmCode({ email, code: confirmCode }),
                  )}
                  {...register('confirm', validators.confirm)}
                />
                <Button
                  type="button"
                  className={styles.button}
                  onClick={() =>
                    requestConfirmCode({ email, code: confirmCode })
                  }
                  disabled={
                    confirmCode.length < 7 ||
                    isRequestConfirmPending ||
                    isEmailRetry ||
                    isEmailConfirmed
                  }
                >
                  {!isRequestConfirmPending && !isEmailConfirmed && '인증 확인'}
                  {isEmailConfirmed && '인증 완료'}
                  {isRequestConfirmPending && '인증 중...'}
                </Button>
              </>
            }
          />
        )}

        <SignupField
          label="비밀번호"
          htmlFor="password"
          emphasizeString="*"
          errorMessage={errors.password?.message}
          content={
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              minLength={8}
              maxLength={20}
              state={errors.password?.message ? 'fail' : 'normal'}
              onKeyDown={handleKeyDown(() => {})}
              {...register('password', validators.password)}
            />
          }
        />

        <SignupField
          label="비밀번호 확인"
          htmlFor="repassword"
          emphasizeString="*"
          errorMessage={errors.repassword?.message}
          content={
            <Input
              id="repassword"
              type="password"
              placeholder="비밀번호를 재입력해주세요."
              minLength={8}
              maxLength={20}
              state={errors.repassword?.message ? 'fail' : 'normal'}
              onKeyDown={handleKeyDown(() => {})}
              {...register('repassword', validators.repassword)}
            />
          }
        />

        <SignupField
          label="닉네임"
          htmlFor="username"
          emphasizeString="*"
          errorMessage={errors.username?.message}
          content={
            <>
              <Input
                id="username"
                type="text"
                placeholder="닉네임을 입력해주세요."
                minLength={2}
                maxLength={16}
                state={errors.username?.message ? 'fail' : 'normal'}
                disabled={isUsernameConfirmed}
                onKeyDown={handleKeyDown(() =>
                  requestCheckDuplicateUsername(username),
                )}
                {...register('username', validators.username)}
              />
              <Button
                type="button"
                className={styles.button}
                onClick={() => requestCheckDuplicateUsername(username)}
                disabled={
                  !username?.length ||
                  isDuplicateUsernamePending ||
                  !!errors.username?.message ||
                  isUsernameConfirmed
                }
              >
                {isDuplicateUsernamePending ? '확인 중...' : '중복 확인'}
              </Button>
            </>
          }
        />

        <Button
          className={styles.next_button}
          disabled={isDisableNextStepButton}
        >
          {isRequestSignupPending ? '...' : '다음 단계로'}
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
