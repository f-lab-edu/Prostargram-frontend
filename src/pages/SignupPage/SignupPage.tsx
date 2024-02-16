import { SubmitHandler, useForm } from 'react-hook-form';

import Logo from '@components/common/Logo';
import Input from '@components/common/Input';
import Field from '@components/common/Field';
import Button from '@components/common/Button';
import {
  emailValidator,
  nicknameValidator,
  passwordValidator,
  repasswordValidator,
} from '@utils/validate';

import * as Styles from './SignupPage.css';

interface ISignUpFormValueTypes {
  email: string;
  password: string;
  repassword: string;
  nickname: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUpFormValueTypes>();

  const onSubmit: SubmitHandler<ISignUpFormValueTypes> = (values) => {
    console.log(values);
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
              {...register('email', emailValidator())}
            />
            <Button type="button" className={Styles.button}>
              인증 요청
            </Button>
          </Field.FieldBox>
          <Field.FieldErrorMessage>
            {errors.email?.message}
          </Field.FieldErrorMessage>
        </Field>

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
              {...register('password', passwordValidator())}
            />
          </Field.FieldBox>
          <Field.FieldErrorMessage>
            {errors.password?.message}
          </Field.FieldErrorMessage>
        </Field>

        <Field>
          <Field.FieldLabel htmlFor="repoassword">
            <Field.FieldEmphasize>*</Field.FieldEmphasize>
            비밀번호 확인
          </Field.FieldLabel>
          <Field.FieldBox>
            <Input
              id="repoassword"
              type="password"
              placeholder="비밀번호를 재입력해주세요."
              minLength={8}
              maxLength={20}
              {...register(
                'repassword',
                repasswordValidator(watch('password')),
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
              {...register('nickname', nicknameValidator())}
            />
            <Button type="button" className={Styles.button}>
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
