const ERROR_MESSAGE = {
  EMAIL: {
    REQUIRED: '이메일은 필수 입력 사항입니다.',
    MAX_LENGTH: '이메일은 최대 길이 30자 이하로 기입해야 합니다.',
    FORMAT_IS_NOT_CORRECT: '이메일 주소 형식에 맞게 입력해주세요.',
  },
  PASSWORD: {
    REQUIRED: '비밀번호는 필수 입력 사항입니다.',
    MIN_LENGTH: '비밀번호는 최소 길이 8자 이상 기입해야 합니다.',
    MAX_LENGTH: '비밀번호는 최대 길이 20자 이하로 기입해야 합니다.',
    FORMAT_IS_NOT_CORRECT:
      '영문 대/소문자, 특수문자, 숫자가 하나 이상 포함되어야 합니다.',
    NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  },
  USERNAME: {
    REQUIRED: '닉네임은 필수 입력 사항입니다.',
    MIN_LENGTH: '닉네임은 최소 2자 이상 작성해야 합니다.',
    MAX_LENGTH: '닉네임은 최대 길이 16자 이하로 작성해야 합니다.',
    FORMAT_IS_NOT_CORRECT:
      '닉네임은 영어(소문자),한글,숫자, _, .만 사용 가능합니다.',
  },
  CODE: {
    REQUIRED: '인증번호를 입력해 주세요.',
    LENGTH: '인증번호는 7자리입니다.',
  },
};

export { ERROR_MESSAGE };
