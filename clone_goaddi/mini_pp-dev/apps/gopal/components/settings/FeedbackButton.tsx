import { MouseEventHandler } from "react";

interface ButtonProps {
  text: String;
  className?: String;
  disabled?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function FeedbackButton({ text, className, disabled, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} border-0`}
    >
      {text}
    </button>
  );
}

export default FeedbackButton;
