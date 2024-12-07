import { FieldValues, RegisterOptions } from 'react-hook-form';

import { REG_EXP } from '@/constants/regExp';
import { ERROR_MESSAGE } from '@/constants/errorMessage';

const email: RegisterOptions<FieldValues> = {
  required: ERROR_MESSAGE.EMAIL.REQUIRED,
  maxLength: {
    value: 30,
    message: ERROR_MESSAGE.EMAIL.MAX_LENGTH,
  },
  validate: {
    emailValidate: (v) =>
      REG_EXP.EMAIL.test(v) || ERROR_MESSAGE.EMAIL.FORMAT_IS_NOT_CORRECT,
  },
};

const password: RegisterOptions<FieldValues> = {
  required: ERROR_MESSAGE.PASSWORD.REQUIRED,
  minLength: {
    value: 8,
    message: ERROR_MESSAGE.PASSWORD.MIN_LENGTH,
  },
  maxLength: {
    value: 20,
    message: ERROR_MESSAGE.PASSWORD.MAX_LENGTH,
  },
  validate: {
    passwordValidate: (v) =>
      REG_EXP.PASSWORD.test(v) || ERROR_MESSAGE.PASSWORD.FORMAT_IS_NOT_CORRECT,
    test: (v, allVal) => {
      if (allVal.repassword !== v) {
        return ERROR_MESSAGE.PASSWORD.NOT_MATCH;
      }

      return true;
    },
  },
};

const repassword: RegisterOptions<FieldValues> = {
  required: ERROR_MESSAGE.PASSWORD.REQUIRED,
  minLength: {
    value: 8,
    message: ERROR_MESSAGE.PASSWORD.MIN_LENGTH,
  },
  maxLength: {
    value: 20,
    message: ERROR_MESSAGE.PASSWORD.MAX_LENGTH,
  },
  validate: {
    passwordValidate: (v) =>
      REG_EXP.PASSWORD.test(v) || ERROR_MESSAGE.PASSWORD.FORMAT_IS_NOT_CORRECT,
    test: (v, allVal) => {
      if (allVal.password !== v) {
        return ERROR_MESSAGE.PASSWORD.NOT_MATCH;
      }

      return true;
    },
  },
};

const username: RegisterOptions<FieldValues> = {
  required: ERROR_MESSAGE.USERNAME.REQUIRED,
  minLength: {
    value: 2,
    message: ERROR_MESSAGE.USERNAME.MIN_LENGTH,
  },
  maxLength: {
    value: 16,
    message: ERROR_MESSAGE.USERNAME.MAX_LENGTH,
  },
  validate: {
    nicknameValidate: (v) =>
      REG_EXP.NICKNAME.test(v) || ERROR_MESSAGE.USERNAME.FORMAT_IS_NOT_CORRECT,
  },
};

const confirm: RegisterOptions<FieldValues> = {
  required: ERROR_MESSAGE.CODE.REQUIRED,
  minLength: {
    value: 7,
    message: ERROR_MESSAGE.CODE.LENGTH,
  },
};

const validators = {
  email,
  username,
  password,
  repassword,
  confirm,
};

export default validators;
