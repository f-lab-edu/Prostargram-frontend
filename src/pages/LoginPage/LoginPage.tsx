import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import Logo from '@components/common/Logo';
import Typo from '@components/common/Typo';
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import ToggleWrapper from '@components/common/ToggleWrapper';
import validator from '@utils/validate';

import OpenEyeIcon from '@assets/icons/open-eye.svg?react';
import CloseEyeIcon from '@assets/icons/close-eye.svg?react';

import * as Styles from './LoginPage.css';

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isDirty },
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className={Styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
        <div style={{ marginBottom: 40 }}>
          <Logo />
        </div>

        <div className={Styles.inputWrapper}>
          <InputField
            id="email"
            type="text"
            label="이메일"
            maxLength={30}
            placeholder="이메일을 입력해주세요."
            errorMessage={isDirty ? errors.email?.message : undefined}
            {...register('email', validator.email())}
          />
          <ToggleWrapper>
            {({ isToggle, toggleHandler }) => (
              <InputField
                id="password"
                type={isToggle ? 'text' : 'password'}
                label="비밀번호"
                maxLength={20}
                placeholder="비밀번호를 입력해주세요."
                errorMessage={isDirty ? errors.password?.message : undefined}
                {...register('password', validator.password())}
                inputPostFix={
                  <button
                    type="button"
                    onClick={toggleHandler}
                    style={{ display: 'flex' }}
                  >
                    {isToggle ? <OpenEyeIcon /> : <CloseEyeIcon />}
                  </button>
                }
              />
            )}
          </ToggleWrapper>
        </div>

        <Typo
          color="gray-3"
          fontSize="body-12"
          textAlign="right"
          marginTop={10}
          marginBottom={40}
          underline
        >
          비밀번호를 잊으셨나요?
        </Typo>
        <Button>로그인</Button>
      </form>

      <div className={Styles.orLine}>
        <hr className={Styles.horizontalLine} />
        <span className={Styles.orSpan}>OR</span>
      </div>

      <Button fill="gray">GitHub 로그인</Button>

      <Typo as="p" fontSize="body-14" marginTop={45} textAlign="center">
        계정이 없으신가요?{' '}
        <Link to="sign-up">
          <Typo as="span" color="primary-2" fontSize="body-14" cursor="pointer">
            회원가입
          </Typo>
        </Link>
      </Typo>
    </div>
  );
};

export default LoginPage;
