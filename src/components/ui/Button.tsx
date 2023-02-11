import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | ReactNode;
}

export const Button = (props: Props) => {
  const { text, className, ...other } = props;

  return (
    <button
      {...other}
      className={`text-sm px-6 transition py-2 rounded-full ${className}`}
    >
      {text}
    </button>
  );
};
