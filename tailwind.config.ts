import type { Config } from 'tailwindcss';


export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-pretendard)',
        title: 'var(--font-nanumsquareneo)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand_blue: 'var(--brand-blue)',
        defaultColor: 'var(--default-color)',
        defaultBg: 'var(--default-bg)',
        labelColor: 'var(--label-color)',
        inputPlaceholderColor: 'var(--input-placeholder-color)',
        inputBg: 'var(--input-bg)',
        inputBorder: 'var(--input-border)',
        inputInvalidBorder: 'var(--input-invalid-border)',
        inputValidBorder: 'var(--input-valid-border)',
        inputFocusBorder: 'var(--input-focus-border)',
        buttonColor: 'var(--button-color)',
        buttonInactiveBg: 'var(--button-inactive-bg)',
        buttonActiveBg: 'var(--button-active-bg)',
        socialLoginBg: 'var(--social-login-bg)',
        socialLoginColor: 'var(--social-login-color)',
        linkColor: 'var(--link-color)',
        modalBg: 'var(--modal-bg)',
      },
      boxShadow: {
        default: 'var(--default-shadow)',
      },
      content: {
        medal: 'url("/medal.svg")',
      },
    },
  },
  plugins: [
    // function ({ addUtilities }) {
    //   addUtilities({
    //     '.center-img': {
    //       top: '50% !important',
    //       left: '50% !important',
    //       transform: 'translate(-50%, -50%)',
    //       objectFit: 'cover',
    //     },
    //   });
    // },
  ],
} satisfies Config;
