'use client'

import React, { useState } from "react";
import { LabeledInput } from "../ui/LabeledInput";
import { SubmitButton } from "../ui/SubmitButton";
// import { ky } from '@lib/middlewares/kyWrapper';
import { toast } from "react-toastify";
// import { ErrorResponse } from "@/app/types/response";
import { validityMessage } from "@lib/constants/validityMessage";
import ToastMessageBox from "../ui/ToastMessageBox";
import { redirect } from "next/navigation";
import { kyPost } from "@lib/middlewares/kyWrapper";

interface LoginFormState {
  email: string;
  password: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: number;
    email: string;
    image: string | null;
    nickname: string;
    updatedAt: string | Date;
    createdAt: string | Date;
  }
}

const signInRequest = async (email: string, password: string) => {
  try {
    // 로그인 요청
    await kyPost('auth/signIn', {
      json: { email, password },
      // throwHttpErrors: false // Do not throw error on non-2xx status
    }).then((data) => {
      console.log(data as TokenResponse);
      document.cookie = `accessToken=${data.accessToken}; path=/; HttpOnly; secure; SameSite=Lax; Max-Age=3600`;
      toast.success('로그인에 성공했습니다');
      redirect('/');
      return data;
    }).catch((err) => {
      toast.error('로그인에 실패했습니다');
      console.error(err);
      return null;
    });
    // 로그인이 성공하면 accessToken을 반환하고 홈페이지(/)로 이동
  } catch (error) {
    toast.error('서버 연결에 실패했습니다');
    console.error('SignIn Error:', error);
    return null;
  }
}

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });
  const handleFormChange = (field: keyof LoginFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(formData);
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  }

  // SubmitButton을 누르거나, form 제출 시 trigger
  const handleSubmit = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`[Form]:`, formData);
    // form에서 빈 값이 있는 경우 early return
    if (!formData.email) return toast(validityMessage.emailIsEmpty);
    if (!formData.password) return toast(validityMessage.passwordIsEmpty);
    signInRequest(formData.email, formData.password);
  }
  return (
    <div className="flex flex-wrap flex-col max-w-[40rem]">
      <ToastMessageBox />
      <form id="login-form" name="login" onSubmit={handleSubmit} className="flex flex-wrap flex-col max-w-[40rem] flex-[0_1_40rem]">
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
        <SubmitButton text='로그인' onSubmit={handleSubmit} />
      </form>
    </div>
  );
}

export default LoginForm;
