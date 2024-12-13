import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const Caption = ({ children, className, ...props }: Props) =>
{
  return (
    <p className={cn("text-xs font-bold tracking-[2px] text-text-secondary uppercase", className)} {...props}>
      {children}
    </p>
  );
};

export default Caption;
