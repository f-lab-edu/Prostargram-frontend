import { KeyboardEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Logo from '@components/common/Logo';
import Input from '@components/common/Input';
import Field from '@components/common/Field';
import Button from '@components/common/Button';
import { REG_EXP } from '@constants/regExp';
import validators from '@utils/validate';

import * as Styles from './SignupPage.css';

const CONFIRM_STATES = {
  PENDING: 'pending',
  REQUEST: 'request',
  CONFIRM: 'confirm',
};

const NICKNAME_STATES = {
  PENDING: 'pending',
  CONFIRM: 'confirm',
};

interface ISignUpFormValueTypes {
  email: string;
  password: string;
  repassword: string;
  nickname: string;
  confirm: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ISignUpFormValueTypes>();
  const [confirmState, setConfirmState] = useState(CONFIRM_STATES.PENDING);
  const [nicknameState, setNicknameState] = useState(NICKNAME_STATES.PENDING);

  const requestConfirmNumber = async () => {
    const emailValue = watch('email');
    if (!emailValue) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return;
    }
    if (!REG_EXP.EMAIL.test(emailValue)) {
      setError('email', {
        type: 'validate',
        message: '이메일 형식이 알맞지 않습니다.',
      });
      return;
    }

    clearErrors('email');
    setConfirmState('request');
  };

  const checkConfirmNumber = async () => {
    const confirmValue = watch('confirm');
    if (!confirmValue) {
      setError('confirm', {
        type: 'required',
        message: '인증번호를 입력해주세요.',
      });
      return;
    }

    if (confirmValue.length < 6) {
      setError('confirm', {
        type: 'min',
        message: '인증번호는 6자리 입니다.',
      });
      return;
    }

    if (!REG_EXP.CONFIRM.test(confirmValue)) {
      setError('confirm', {
        type: 'validate',
        message: '인증번호는 숫자로만 입력해야 합니다.',
      });
      return;
    }

    clearErrors('confirm');
    setConfirmState('confirm');
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
    setNicknameState(NICKNAME_STATES.CONFIRM);
  };

  const onSubmit: SubmitHandler<ISignUpFormValueTypes> = (values) => {
    console.log(values);
  };

  const preventEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.logoBox}>
        <Logo />
      </div>

      <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Field.FieldLabel htmlFor="email">
            <Field.FieldEmphasize>*</Field.FieldEmphasize>
            이메일
          </Field.FieldLabel>
          <Field.FieldBox>
            <Input
              id="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              maxLength={30}
              disabled={confirmState !== CONFIRM_STATES.PENDING}
              state={(errors.email?.message && 'fail') || 'normal'}
              onKeyDown={preventEnter}
              {...register('email', validators.email())}
            />
            <Button
              type="button"
              className={Styles.button}
              onClick={requestConfirmNumber}
              disabled={confirmState !== CONFIRM_STATES.PENDING}
            >
              {confirmState === CONFIRM_STATES.PENDING
                ? '인증 요청'
                : '요청 완료'}
            </Button>
          </Field.FieldBox>
          <Field.FieldErrorMessage>
            {errors.email?.message}
          </Field.FieldErrorMessage>
        </Field>

        {confirmState !== CONFIRM_STATES.PENDING && (
          <Field>
            <Field.FieldLabel htmlFor="confirm">
              <Field.FieldEmphasize>*</Field.FieldEmphasize>
              인증번호
            </Field.FieldLabel>
            <Field.FieldBox>
              <Input
                id="confirm"
                type="text"
                placeholder="인증번호를 입력해주세요."
                maxLength={6}
                disabled={confirmState === CONFIRM_STATES.CONFIRM}
                state={errors.confirm?.message ? 'fail' : 'normal'}
                onKeyDown={preventEnter}
                {...register(
                  'confirm',
                  validators.confirm(confirmState === CONFIRM_STATES.CONFIRM),
                )}
              />
              <Button
                type="button"
                className={Styles.button}
                onClick={checkConfirmNumber}
                disabled={confirmState === CONFIRM_STATES.CONFIRM}
              >
                {confirmState === CONFIRM_STATES.CONFIRM
                  ? '인증 완료'
                  : '인증 확인'}
              </Button>
            </Field.FieldBox>
            <Field.FieldErrorMessage>
              {errors.confirm?.message}
            </Field.FieldErrorMessage>
          </Field>
        )}

        <Field>
          <Field.FieldLabel htmlFor="password">
            <Field.FieldEmphasize>*</Field.FieldEmphasize>
            비밀번호
          </Field.FieldLabel>
          <Field.FieldBox>
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
          </Field.FieldBox>
          <Field.FieldErrorMessage>
            {errors.password?.message}
          </Field.FieldErrorMessage>
        </Field>

        <Field>
          <Field.FieldLabel htmlFor="repassword">
            <Field.FieldEmphasize>*</Field.FieldEmphasize>
            비밀번호 확인
          </Field.FieldLabel>
          <Field.FieldBox>
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
          </Field.FieldBox>
          <Field.FieldErrorMessage>
            {errors.repassword?.message}
          </Field.FieldErrorMessage>
        </Field>

        <Field>
          <Field.FieldLabel htmlFor="nickname">
            <Field.FieldEmphasize>*</Field.FieldEmphasize>
            닉네임
          </Field.FieldLabel>
          <Field.FieldBox>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요."
              minLength={2}
              maxLength={16}
              state={errors.nickname?.message ? 'fail' : 'normal'}
              disabled={nicknameState === NICKNAME_STATES.CONFIRM}
              onKeyDown={preventEnter}
              {...register(
                'nickname',
                validators.nickname(nicknameState === NICKNAME_STATES.CONFIRM),
              )}
            />
            <Button
              type="button"
              className={Styles.button}
              onClick={checkNickname}
              disabled={nicknameState === NICKNAME_STATES.CONFIRM}
            >
              중복 확인
            </Button>
          </Field.FieldBox>
          <Field.FieldErrorMessage>
            {errors.nickname?.message}
          </Field.FieldErrorMessage>
        </Field>
        <Button className={Styles.nextButton}>다음 단계로</Button>
      </form>
    </div>
  );
};

export default SignupPage;
