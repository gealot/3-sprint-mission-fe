'use client';

import styles from './LabeledInput.module.css';
import { useState } from 'react';

type InputVariant = 'text' | 'email' | 'password';
type HtmlFor = 'email' | 'password' | 'password-confirm' | 'nickname';
type LabelType = '이메일' | '비밀번호' | '비밀번호 확인' | '닉네임';
type InputProps = {
  htmlFor: HtmlFor;
  label: LabelType;
  variant: InputVariant;
  placeholder: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabeledInput = ({
  htmlFor,
  label,
  variant,
  placeholder,
  value,
  required = false,
  onChange,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      <input
        type={variant}
        placeholder={placeholder}
        value={inputValue}
        required={required}
        onChange={handleChange}
        // className='bg-gray-100 w-full py-[0.5625rem] px-4 gap-2.5 rounded-xl'
        className={styles.labeledInput}
      />
    </div>
  );
}
