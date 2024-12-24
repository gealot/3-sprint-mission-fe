export const validityMessage = {
  requiredField: `필수 입력 항목입니다.`,
  emailIsEmpty: `이메일을 입력해주세요.`,
  invalidEmail: `잘못된 이메일 형식입니다.`,
  emailIsExist: `사용 중인 이메일입니다.`,
  nicknameIsEmpty: `닉네임을 입력해주세요.`,
  invalidNickname: `닉네임은 한글, 영문, 숫자로 2~16자 사이로 입력하세요`,
  passwordIsEmpty: `비밀번호를 입력해주세요.`,
  passwordIsTooShort: `비밀번호를 8자리 이상 입력해주세요.`,
  passwordIsNotMatch: `비밀번호가 일치하지 않습니다.`,
  wrongPassword: `이메일 또는 비밀번호가 일치하지 않습니다.`,
  signupSuccess: `회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.`,
  signinSuccess: `로그인이 완료되었습니다. 홈페이지로 이동합니다.`,
  signupFailure: `회원가입에 실패했습니다. 다시 시도해주세요.`,
  signinFailure: `로그인에 실패했습니다. 다시 시도해주세요.`,
} as const;

export type ValidityMessageType =
  (typeof validityMessage)[keyof typeof validityMessage];
