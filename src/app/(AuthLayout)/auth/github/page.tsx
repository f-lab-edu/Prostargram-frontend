'use client';

import { useRouter } from 'next/navigation';
import { KeyboardEvent } from 'react';

import Logo from '@/components/common/Logo';
import Field from '@/components/common/Field';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import validators from '@/utils/validate';
import useSignUpState, { ISignUpFormValueType } from '@/hooks/useSignUpState';

import styles from './page.module.scss';

const GithubSignupPage = () => {
  const router = useRouter();
  const {
    changeConfirmState,
    checkConfirmNumber,
    checkNickname,
    requestConfirmNumber,
    handleSubmit,
    register,
    formState: { errors },
    isEmailPending,
    isEmailRetry,
    isEmailConfirmed,
    isNicknameConfirmed,
  } = useSignUpState();

  const onSubmit = (data: ISignUpFormValueType) => {
    console.log(data);
    router.push('/auth/info');
  };

  const preventEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault();
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
                state={(errors.email?.message && 'fail') || 'normal'}
                onKeyDown={preventEnter}
                {...register('email', validators.email(isEmailConfirmed))}
              />
              <Field.TimerButton
                type="button"
                className={styles.button}
                onClick={requestConfirmNumber}
                changeConfirmState={changeConfirmState}
                disabled={!isEmailPending && !isEmailRetry}
                startTimeForMilliseconds={900_000} // 15분
              >
                {!isEmailRetry && isEmailPending && '인증 요청'}
                {isEmailRetry && !isEmailPending && '재요청'}
                {!isEmailRetry && !isEmailPending && '요청 완료'}
              </Field.TimerButton>
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
                  maxLength={6}
                  disabled={isEmailConfirmed}
                  state={errors.confirm?.message ? 'fail' : 'normal'}
                  onKeyDown={preventEnter}
                  {...register('confirm', validators.confirm(isEmailConfirmed))}
                />
                <Button
                  type="button"
                  className={styles.button}
                  onClick={checkConfirmNumber}
                  disabled={isEmailConfirmed}
                >
                  {isEmailConfirmed ? '인증 완료' : '인증 확인'}
                </Button>
              </Field.Box>
              <Field.ErrorMessage>{errors.confirm?.message}</Field.ErrorMessage>
            </Field>
          )}

          <Field className={styles.last_field}>
            <Field.Label htmlFor="nickname">
              <Field.Emphasize>*</Field.Emphasize>
              닉네임
            </Field.Label>
            <Field.Box>
              <Input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요."
                state={errors.nickname?.message ? 'fail' : 'normal'}
                disabled={isNicknameConfirmed}
                {...register(
                  'nickname',
                  validators.nickname(isNicknameConfirmed),
                )}
              />
              <Button
                type="button"
                className={styles.button}
                onClick={checkNickname}
                disabled={isNicknameConfirmed}
              >
                중복 확인
              </Button>
            </Field.Box>
            <Field.ErrorMessage>{errors.nickname?.message}</Field.ErrorMessage>
          </Field>
        </div>

        <Button>다음 단계로</Button>
      </form>
    </div>
  );
};

export default GithubSignupPage;
