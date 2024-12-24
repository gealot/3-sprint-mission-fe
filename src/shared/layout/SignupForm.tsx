'use client'

import React, { useState } from "react";
import { LabeledInput } from "../ui/LabeledInput";
import { SubmitButton } from "../ui/SubmitButton";
import { ky } from '@lib/middlewares/kyWrapper';
import { toast } from "react-toastify";
import ToastMessageBox from "../ui/ToastMessageBox";

interface SignupFormState {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: string | null;
    nickname: string;
    updatedAt: string | Date;
    createdAt: string | Date;
  }
}

const signUp = async (SignupForm: SignupFormState) => {
  await ky.post('auth/signUp', {
    json: SignupForm
  }).json<SignupResponse>().then((data) => {
    console.log(data);
    document.cookie = `accessToken=${data.accessToken}; path=/; HttpOnly; secure; SameSite=Lax; Max-Age=3600`;
    toast(`회원가입이 완료되었습니다.`);
    return;
  }).catch((err) => {
    toast(`회원가입에 실패했습니다. ${err}`);
    console.error(err);
  }).finally(() => {
    console.log('[Sign Up]:', SignupForm);
  });
}

const SignupForm = () => {
  const [formData, setFormData] = useState<SignupFormState>({
    nickname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const handleFormChange = (field: keyof SignupFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(formData.password, formData.passwordConfirmation)
    if (formData.password !== formData.passwordConfirmation) {
      toast(`비밀번호가 일치하지 않습니다.`);
      return;
    }
    signUp(formData);
    console.log(`[Form]:`, formData);
  }
  return (
    <div className="flex flex-wrap flex-col max-w-[40rem]">
      <ToastMessageBox />
      <LabeledInput
        htmlFor='nickname'
        label='닉네임'
        variant='text'
        placeholder='닉네임을 입력해주세요'
        value={formData.nickname}
        required
        onChange={handleFormChange('nickname')}
      />
      <LabeledInput
        htmlFor="email"
        label='이메일'
        variant='email'
        placeholder='이메일을 입력해주세요'
        value={formData.email}
        required
        onChange={handleFormChange('email')}
      />
      <LabeledInput
        htmlFor="password"
        label='비밀번호'
        variant='password'
        placeholder='비밀번호를 입력해주세요'
        value={formData.password}
        required
        onChange={handleFormChange('password')}
      />

      <LabeledInput
        htmlFor="password-confirm"
        label='비밀번호'
        variant='password'
        placeholder='비밀번호를 입력해주세요'
        value={formData.passwordConfirmation}
        required
        onChange={handleFormChange('passwordConfirmation')}
      />
      <SubmitButton text='회원가입' onSubmit={handleSubmit} />
    </div>
  );
}

export default SignupForm;
