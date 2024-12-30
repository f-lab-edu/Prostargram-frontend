'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import Logo from '@/components/common/Logo';
import Typo from '@/components/common/Typo';
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import ToggleWrapper from '@/components/common/ToggleWrapper';
import { useToastContext } from '@/components/common/Toast/ToastProvider';
import { useLogin } from '@/api/mutations/auth';
import validator from '@/utils/validate';
import {
  saveAccessToken,
  saveRefreshToken,
  saveUserId,
} from '@/utils/manageToken';

import OpenEyeIcon from '@/assets/icons/open-eye.svg';
import CloseEyeIcon from '@/assets/icons/close-eye.svg';

import styles from './page.module.scss';

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { addToast } = useToastContext();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormInput>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const { mutate: requestLogin, isPending } = useLogin({
    onSuccess: (res) => {
      const { isSuccess, code, message, result } = res;

      if (code === 1000 && isSuccess && result) {
        saveAccessToken(result.accessToken);
        saveRefreshToken(result.refreshToken);
        saveUserId(result.userId);
        addToast({ type: 'success', message: '성공적으로 로그인 되었습니다.' });
        router.push('/');
      } else {
        setError('email', {
          type: 'validate',
          message,
        });
      }
    },
    onError: (err) => {
      addToast({ type: 'error', message: err.message });
      setError('email', {
        type: 'deps',
        message: '알 수 없는 에러가 발생했습니다. 다시 로그인 해 주세요.',
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    requestLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.input_wrapper}>
        <InputField
          id="email"
          type="text"
          label="이메일"
          maxLength={30}
          placeholder="이메일을 입력해주세요."
          errorMessage={isDirty ? errors.email?.message : undefined}
          {...register('email', validator.email)}
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
              {...register('password', validator.password)}
              inputPostFix={
                <button
                  type="button"
                  onClick={toggleHandler}
                  style={{ display: 'flex' }}
                >
                  {isToggle ? (
                    <OpenEyeIcon width="22" height="22" />
                  ) : (
                    <CloseEyeIcon />
                  )}
                </button>
              }
            />
          )}
        </ToggleWrapper>
      </div>

      <Typo
        as="span"
        color="gray-3"
        fontSize="body-14"
        textAlign="right"
        marginTop={10}
        marginBottom={40}
        underline
      >
        비밀번호를 잊으셨나요?
      </Typo>
      <Button disabled={isPending}>
        {isPending ? '요청 중...' : '로그인'}
      </Button>
    </form>
  );
};

const LoginPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <div style={{ marginBottom: 40 }}>
          <Logo />
        </div>

        <LoginForm />
      </div>
      <div className={styles.or_line}>
        <hr className={styles.horizontal_line} />
        <span className={styles.or_span}>OR</span>
      </div>

      <Button fill="gray" onClick={() => router.push('/auth/github')}>
        GitHub 로그인
      </Button>

      <Typo as="p" fontSize="body-14" marginTop={45} textAlign="center">
        계정이 없으신가요?{' '}
        <Link href="/auth/sign-up">
          <Typo as="span" color="primary-2" fontSize="body-14" cursor="pointer">
            회원가입
          </Typo>
        </Link>
      </Typo>
    </div>
  );
};

export default LoginPage;
