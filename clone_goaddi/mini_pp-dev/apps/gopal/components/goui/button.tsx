import React from "react";
import { cn } from "@/lib/utils";
import Spinner from "./spinner";

type ButtonVariant = "primary" | "secondary" | "success" | "danger";
type ButtonSize = "small" | "medium" | "large";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: () => void | any;
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const GoButton: React.FC<ButtonProps> = ({
  variant,
  size,
  type,
  disabled,
  onClick,
  loading,
  className,
  children,
}) => {
  return (
    <button
      type={type ?? "submit"} // Set button type
      className={cn(
        "bg-primary600 text-white rounded-sm px-3.5 py-[7px] md:text-xs text-xs w-fit hover:text-primary600 hover:bg-white border border-primary600 hover:border-primary600",
        className,
        disabled ? "opacity-50" : null,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GoButton;

export const GoAuthButton: React.FC<ButtonProps> = ({
  variant,
  size,
  type,
  disabled,
  loading,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      type={type ?? "submit"} // Set button type
      disabled={disabled}
      className={cn(
        "group w-full    rounded-sm px-3.5 py-[7px] md:text-xs text-xs w-fit   border ",
        variant === "secondary"
          ? "bg-primary200 text-primary600 hover:text-white hover:bg-primary600 border-primary200 hover:border-primary600"
          : "bg-primary600 text-white hover:text-primary600 hover:bg-white border-primary600 hover:border-primary600",
        loading ? "cursor-not-allowed" : "cursor-pointer",
        disabled ? "opacity-50 cursor-not-allowed" : null,
        className,
      )}
      onClick={onClick}
    >
      {loading ? <Spinner /> : <>{children}</>}
    </button>
  );
};
