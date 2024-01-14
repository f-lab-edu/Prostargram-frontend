/// <reference types="vite-plugin-svgr/client" />

import { FormEvent } from 'react';

import Logo from '@components/common/Logo';
import Typo from '@components/common/Typo';
import Button from '@components/common/Button';
import InputField from '@components/common/InputField';
import ToggleWrapper from '@components/common/ToggleWrapper';

import OpenEyeIcon from '@assets/icons/open-eye.svg?react';
import CloseEyeIcon from '@assets/icons/close-eye.svg?react';

import * as Styles from './LoginPage.css';

const LoginPage = () => {
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={Styles.container}>
      <form onSubmit={submitHandler} className={Styles.form}>
        <div style={{ marginBottom: 40 }}>
          <Logo />
        </div>

        <div className={Styles.inputWrapper}>
          <InputField
            id="email"
            type="text"
            label="이메일"
            name="email"
            placeholder="이메일을 입력해주세요."
          />
          <ToggleWrapper>
            {({ isToggle, toggleHandler }) => (
              <InputField
                id="password"
                type={isToggle ? 'text' : 'password'}
                label="비밀번호"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                inputPostFix={
                  <button onClick={toggleHandler} style={{ display: 'flex' }}>
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

      <Typo as="p" textAlign="center" marginTop={45} fontSize="body-14">
        계정이 없으신가요?{' '}
        <Typo as="span" color="primary-2" fontSize="body-14">
          회원가입
        </Typo>
      </Typo>
    </div>
  );
};

export default LoginPage;
