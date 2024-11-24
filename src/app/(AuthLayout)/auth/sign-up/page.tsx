'use client';

import { useForm } from 'react-hook-form';
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

import styles from './page.module.scss';

const SignupPage = () => {
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
    changeConfirmState,
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
    changeConfirmState,
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
    changeConfirmState(CONFIRM_STATES.PENDING);
  };

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
  };

  useEffect(() => {
    const [password, repassword] = watch(['password', 'repassword']);
    if (password !== '' && password === repassword) {
      clearErrors(['password', 'repassword']);
    }
  }, [watch, clearErrors]);

  return (
    <div className={styles.container}>
      <div className={styles.logo_box}>
        <Logo />
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                changeState={() => changeConfirmState('retry')}
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
          <Field.Label htmlFor="password">
            <Field.Emphasize>*</Field.Emphasize>
            비밀번호
          </Field.Label>
          <Field.Box>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              minLength={8}
              maxLength={20}
              state={errors.password?.message ? 'fail' : 'normal'}
              onKeyDown={preventEnter}
              {...register('password', validators.password)}
            />
          </Field.Box>
          <Field.ErrorMessage>{errors.password?.message}</Field.ErrorMessage>
        </Field>

        <Field>
          <Field.Label htmlFor="repassword">
            <Field.Emphasize>*</Field.Emphasize>
            비밀번호 확인
          </Field.Label>
          <Field.Box>
            <Input
              id="repassword"
              type="password"
              placeholder="비밀번호를 재입력해주세요."
              minLength={8}
              maxLength={20}
              state={errors.repassword?.message ? 'fail' : 'normal'}
              onKeyDown={preventEnter}
              {...register('repassword', validators.repassword)}
            />
          </Field.Box>
          <Field.ErrorMessage>{errors.repassword?.message}</Field.ErrorMessage>
        </Field>

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
        <Button
          className={styles.next_button}
          disabled={!isValid || isRequestSignupPending}
        >
          {isRequestSignupPending ? '...' : '다음 단계로'}
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
