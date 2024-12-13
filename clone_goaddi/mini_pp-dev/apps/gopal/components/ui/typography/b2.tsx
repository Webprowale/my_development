import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const B2 = ({ children, className, ...props }: Props) =>
{
  return (
    <p className={cn("text-base font-semibold text-text", className)} {...props}>
      {children}
    </p>
  );
};

export default B2;
