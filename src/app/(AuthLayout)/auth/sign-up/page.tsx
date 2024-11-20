'use client';

import { useRouter } from 'next/navigation';
import { KeyboardEvent } from 'react';

import Logo from '@/components/common/Logo';
import Input from '@/components/common/Input';
import Field from '@/components/common/Field';
import Button from '@/components/common/Button';
import validators from '@/utils/validate';
import useSignUpState, { ISignUpFormValueType } from '@/hooks/useSignUpState';

import styles from './page.module.scss';

const SignupPage = () => {
  const router = useRouter();
  const {
    changeConfirmState,
    checkConfirmNumber,
    checkNickname,
    requestConfirmNumber,
    handleSubmit,
    register,
    watch,
    formState: { errors },
    isRequestPending,
    isEmailPending,
    isEmailRetry,
    isEmailConfirmed,
    isNicknameConfirmed,
  } = useSignUpState();

  const onSubmit = (values: ISignUpFormValueType) => {
    console.log(values);
    router.push('/auth/info');
  };

  const preventEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo_box}>
        <Logo />
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
              disabled={
                !isEmailRetry &&
                errors.email?.type !== 'isRequestConfirmedValidate'
              }
              startTimeForMilliseconds={300_000} // 5분
            >
              {isEmailPending && !isEmailRetry && '인증 요청'}
              {(isRequestPending || (!isEmailPending && !isEmailRetry)) &&
                '요청 중...'}
              {isEmailRetry && '재요청'}
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
              {...register('password', validators.password())}
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
              {...register(
                'repassword',
                validators.repassword(watch('password')),
              )}
            />
          </Field.Box>
          <Field.ErrorMessage>{errors.repassword?.message}</Field.ErrorMessage>
        </Field>

        <Field>
          <Field.Label htmlFor="nickname">
            <Field.Emphasize>*</Field.Emphasize>
            닉네임
          </Field.Label>
          <Field.Box>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요."
              minLength={2}
              maxLength={16}
              state={errors.nickname?.message ? 'fail' : 'normal'}
              disabled={isNicknameConfirmed}
              onKeyDown={preventEnter}
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
        <Button className={styles.next_button}>다음 단계로</Button>
      </form>
    </div>
  );
};

export default SignupPage;
