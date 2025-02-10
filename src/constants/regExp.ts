const REG_EXP = {
  EMAIL:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%*?&.,])[A-Za-z\d#$@!%*?&.,]{8,20}$/,
  NICKNAME: /^[a-z0-9가-힣_.]{2,16}$/,
  ONLY_ENG_NUM: /^[a-zA-Z0-9]*$/,
};

export { REG_EXP };
