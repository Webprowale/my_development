import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    errorMessage?:string,
    errorTitle?:string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,errorMessage,errorTitle, ...props }, ref) => {
    return (
      <>
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border-2 focus:border-primary600 focus-visible:border-primary600 border-input bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      {
        errorMessage?
        <small className="text-[crimson]">
          {errorTitle?
               errorMessage?.replace(/[^\s]*/,errorTitle?errorTitle:''):
               ""
          }
        </small>:''
      }
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
