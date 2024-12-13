import { ColorScheme } from "./button.interface";

export const colorSchemeSolidClasses: Record<ColorScheme, string> = {
  primary: "bg-primary-600",
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  gray: "bg-gray-500",
};

export const colorSchemeOutlineClasses: Record<ColorScheme, string> = {
  primary: "text-primary border-primary",
  success: "text-success border-success",
  danger: "text-danger border-danger",
  warning: "text-warning border-warning",
  info: "text-info border-info",
  gray: "text-gray-500 border-gray-500",
};

export const sizeClasses: Record<string, string> = {
  sm: "p-1 text-sm",
  md: "p-2 text-base",
  lg: "p-3 text-lg",
};

export const baseClassName =
  "h-fit flex items-center rounded default-transition cursor-pointer disabled:cursor-not-allowed";
