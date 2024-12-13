import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const B3 = ({ children, className, ...props }: Props) =>
{
  return (
    <p className={cn("text-sm font-medium text-text-secondary", className)} {...props}>
      {children}
    </p>
  );
};

export default B3;
