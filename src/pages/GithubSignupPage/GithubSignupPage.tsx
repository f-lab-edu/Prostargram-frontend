import { KeyboardEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Logo from '@components/common/Logo';
import Field from '@components/common/Field';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import validators from '@utils/validate';
import { REG_EXP } from '@constants/regExp';

import * as Styles from './GithubSignupPage.css';

interface IGithubSignupFormType {
  email: string;
  nickname: string;
  confirm: string;
}

type ConfirmStateType = 'pending' | 'request' | 'confirm';
type NicknameStateType = 'pending' | 'confirm';

const GithubSignupPage = () => {
  const [confirmState, setConfirmState] = useState<ConfirmStateType>('pending');
  const [nicknameState, setNicknameState] =
    useState<NicknameStateType>('pending');

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IGithubSignupFormType>();

  const onSubmit: SubmitHandler<IGithubSignupFormType> = (values) => {
    console.log(values);
  };

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

  const checkNickname = () => {
    const nicknameValue = watch('nickname');
    if (!nicknameValue) {
      setError('nickname', {
        type: 'required',
        message: '닉네임을 입력해주세요.',
      });
      return;
    }

    if (nicknameValue === 'nickname') {
      setError('nickname', {
        type: 'validate',
        message: '중복된 닉네임입니다.',
      });
      return;
    }

    clearErrors('nickname');
    setNicknameState('confirm');
  };

  const preventEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const isPending = confirmState === 'pending';
  const isConfirm = confirmState === 'confirm';
  const nicknameConfirmed = nicknameState === 'confirm';

  return (
    <div className={Styles.container}>
      <Logo />

      <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
        <div>
          <p className={Styles.subTitle}>회원가입</p>
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
                disabled={!isPending}
                state={(errors.email?.message && 'fail') || 'normal'}
                onKeyDown={preventEnter}
                {...register('email', validators.email())}
              />
              <Button
                type="button"
                className={Styles.button}
                onClick={requestConfirmNumber}
                disabled={!isPending}
              >
                {isPending ? '인증 요청' : '요청 완료'}
              </Button>
            </Field.FieldBox>
            <Field.FieldErrorMessage>
              {errors.email?.message}
            </Field.FieldErrorMessage>
          </Field>

          {!isPending && (
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
                  disabled={isConfirm}
                  state={errors.confirm?.message ? 'fail' : 'normal'}
                  onKeyDown={preventEnter}
                  {...register('confirm', validators.confirm())}
                />
                <Button
                  type="button"
                  className={Styles.button}
                  onClick={checkConfirmNumber}
                  disabled={isConfirm}
                >
                  {isConfirm ? '인증 완료' : '인증 확인'}
                </Button>
              </Field.FieldBox>
              <Field.FieldErrorMessage>
                {errors.confirm?.message}
              </Field.FieldErrorMessage>
            </Field>
          )}

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
                disabled={nicknameConfirmed}
                {...register('nickname', validators.nickname())}
              />
              <Button
                type="button"
                className={Styles.button}
                onClick={checkNickname}
                disabled={nicknameConfirmed}
              >
                중복 확인
              </Button>
            </Field.FieldBox>
            <Field.FieldErrorMessage>
              {errors.nickname?.message}
            </Field.FieldErrorMessage>
          </Field>
        </div>

        <Button>다음 단계로</Button>
      </form>
    </div>
  );
};

export default GithubSignupPage;
