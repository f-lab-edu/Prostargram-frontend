import { KeyboardEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import Logo from '@components/common/Logo';
import Field from '@components/common/Field';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import validators from '@utils/validate';
import { REG_EXP } from '@constants/regExp';

import * as Styles from './GithubSignupPage.css';

const ConfirmStates = {
  PENDING: 'pending',
  REQUEST: 'request',
  CONFIRM: 'confirm',
};

const NicknameStates = {
  PENDING: 'pending',
  CONFIRM: 'confirm',
};

interface IGithubSignupFormType {
  email: string;
  nickname: string;
  confirm: string;
}

const GithubSignupPage = () => {
  const [confirmState, setConfirmState] = useState(ConfirmStates.PENDING);
  const [nicknameState, setNicknameState] = useState(NicknameStates.PENDING);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IGithubSignupFormType>();

  const onSubmit = (values: IGithubSignupFormType) => {
    console.log(values);
  };

  const requestConfirmNumber = async () => {
    const email = watch('email');
    if (!email) {
      setError('email', {
        type: 'required',
        message: '이메일을 입력해주세요.',
      });
      return;
    }
    if (!REG_EXP.EMAIL.test(email)) {
      setError('email', {
        type: 'validate',
        message: '이메일 형식이 알맞지 않습니다.',
      });
      return;
    }
    clearErrors('email');
    setConfirmState(ConfirmStates.REQUEST);
  };

  const checkConfirmNumber = async () => {
    const confirm = watch('confirm');
    if (!confirm) {
      setError('confirm', {
        type: 'required',
        message: '인증번호를 입력해주세요.',
      });
      return;
    }
    if (confirm.length < 6) {
      setError('confirm', { type: 'min', message: '인증번호는 6자리 입니다.' });
      return;
    }
    if (!REG_EXP.CONFIRM.test(confirm)) {
      setError('confirm', {
        type: 'validate',
        message: '인증번호는 숫자로만 입력해야 합니다.',
      });
      return;
    }
    clearErrors('confirm');
    setConfirmState(ConfirmStates.CONFIRM);
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
    setNicknameState(NicknameStates.CONFIRM);
  };

  const preventEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

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
                disabled={confirmState !== ConfirmStates.PENDING}
                state={(errors.email?.message && 'fail') || 'normal'}
                onKeyDown={preventEnter}
                {...register('email', validators.email())}
              />
              <Button
                type="button"
                className={Styles.button}
                onClick={requestConfirmNumber}
                disabled={confirmState !== ConfirmStates.PENDING}
              >
                {confirmState === ConfirmStates.PENDING
                  ? '인증 요청'
                  : '요청 완료'}
              </Button>
            </Field.FieldBox>
            <Field.FieldErrorMessage>
              {errors.email?.message}
            </Field.FieldErrorMessage>
          </Field>

          {confirmState !== ConfirmStates.PENDING && (
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
                  disabled={confirmState === ConfirmStates.CONFIRM}
                  state={errors.confirm?.message ? 'fail' : 'normal'}
                  onKeyDown={preventEnter}
                  {...register(
                    'confirm',
                    validators.confirm(confirmState === ConfirmStates.CONFIRM),
                  )}
                />
                <Button
                  type="button"
                  className={Styles.button}
                  onClick={checkConfirmNumber}
                  disabled={confirmState === ConfirmStates.CONFIRM}
                >
                  {confirmState === ConfirmStates.CONFIRM
                    ? '인증 완료'
                    : '인증 확인'}
                </Button>
              </Field.FieldBox>
              <Field.FieldErrorMessage>
                {errors.confirm?.message}
              </Field.FieldErrorMessage>
            </Field>
          )}

          <Field className={Styles.lastField}>
            <Field.FieldLabel htmlFor="nickname">
              <Field.FieldEmphasize>*</Field.FieldEmphasize>
              닉네임
            </Field.FieldLabel>
            <Field.FieldBox>
              <Input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요."
                state={errors.nickname?.message ? 'fail' : 'normal'}
                disabled={nicknameState === NicknameStates.CONFIRM}
                {...register(
                  'nickname',
                  validators.nickname(nicknameState === NicknameStates.CONFIRM),
                )}
              />
              <Button
                type="button"
                className={Styles.button}
                onClick={checkNickname}
                disabled={nicknameState === NicknameStates.CONFIRM}
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
