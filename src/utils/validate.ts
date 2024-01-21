import { FieldValues, RegisterOptions } from 'react-hook-form';

export const emailValidator: RegisterOptions<FieldValues> = {
  required: '이메일은 필수 입력 사항입니다.',
  maxLength: {
    value: 30,
    message: '이메일은 최대 길이 30자 이하로 작성해야 합니다.',
  },
  validate: {
    emailValidate: (v) =>
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        v,
      ) || '이메일 주소 형식에 맞게 입력해주세요.',
  },
};

export const passwordValidator: RegisterOptions<FieldValues> = {
  required: '비밀번호는 필수 입력 사항입니다.',
  minLength: {
    value: 8,
    message: '비밀번호는 최소 길이 8자 이상으로 작성해야 합니다.',
  },
  maxLength: {
    value: 20,
    message: '비밀번호는 최대 길이 20자 이하로 작성해야 합니다.',
  },
  validate: {
    passwordValidate: (v) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&.,])[A-Za-z\d$@$!%*?&.,]/.test(
        v,
      ) || '영문 대/소문자, 특수문자, 숫자가 하나 이상 포함되어야 합니다.',
  },
};
