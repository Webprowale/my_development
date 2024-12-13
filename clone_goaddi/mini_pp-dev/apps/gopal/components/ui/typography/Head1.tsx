import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const Head1 = ({ children, className, ...props }: Props) =>
{
  return (
    <h1 className={cn("text-[46px] text-text font-bold", className)} {...props}>
      {children}
    </h1>
  );
};

export default Head1;
