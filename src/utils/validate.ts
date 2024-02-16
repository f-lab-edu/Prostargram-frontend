import { FieldValues, RegisterOptions } from 'react-hook-form';

export const emailValidator: () => RegisterOptions<FieldValues> = () => ({
  required: '이메일은 필수 입력 사항입니다.',
  maxLength: {
    value: 30,
    message: '이메일은 최대 길이 30자 이하로 기입해야 합니다.',
  },
  validate: {
    emailValidate: (v) =>
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        v,
      ) || '이메일 주소 형식에 맞게 입력해주세요.',
  },
});

export const passwordValidator: () => RegisterOptions<FieldValues> = () => ({
  required: '비밀번호는 필수 입력 사항입니다.',
  minLength: {
    value: 8,
    message: '비밀번호는 최소 길이 8자 이상 기입해야 합니다.',
  },
  maxLength: {
    value: 20,
    message: '비밀번호는 최대 길이 20자 이하로 기입해야 합니다.',
  },
  validate: {
    passwordValidate: (v) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&.,])[A-Za-z\d$@$!%*?&.,]/.test(
        v,
      ) || '영문 대/소문자, 특수문자, 숫자가 하나 이상 포함되어야 합니다.',
  },
});

export const repasswordValidator: (
  password: string,
) => RegisterOptions<FieldValues> = (password) => {
  return {
    required: '비밀번호 확인은 필수 입력 사항입니다.',
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
      test: (v) => {
        if (password !== v) {
          return '비밀번호가 일치하지 않습니다.';
        }

        return true;
      },
    },
  };
};

export const nicknameValidator: () => RegisterOptions<FieldValues> = () => ({
  required: '닉네임은 필수 입력 사항입니다.',
  maxLength: {
    value: 16,
    message: '닉네임은 최대 길이 16자 이하로 작성해야 합니다.',
  },
  validate: {
    nicknameValidate: (v) =>
      /^(?=.*[a-z0-9가-힣_.])[a-z0-9가-힣_.]{2,16}$/i.test(v) ||
      '닉네임은 영어,한글,숫자, _, .만 사용 가능합니다.',
  },
});
