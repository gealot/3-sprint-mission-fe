'use client';

interface SubmitButtonProps {
  text: string;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const SubmitButton = ({ text, onSubmit }: SubmitButtonProps) => {
  return (
    <button className='h-14 bg-[color:var(--button-inactive-bg)] text-xl font-semibold text-[color:var(--button-color)] transition-all duration-[0.2s] ease-[ease-in-out] rounded-[1.75rem] focus:drop-shadow-[var(--default-shadow)] invalid:bg-[color:var(--button-inactive-bg)] invalid:cursor-not-allowed valid:bg-[color:var(--button-active-bg)] valid:cursor-pointer' onClick={onSubmit}>
      {text}
    </button>
  );
}
