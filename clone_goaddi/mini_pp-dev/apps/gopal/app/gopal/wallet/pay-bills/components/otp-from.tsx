"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPControlled() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value: string) => setValue(value)}
        className="flex items-center justify-center"
      >
        <InputOTPGroup className='flex items-center justify-center w-full space-x-4'>
          <InputOTPSlot index={0} className="w-[84px] h-[100px] rounded border" />
          <InputOTPSlot index={1} className="w-[84px] h-[100px] rounded border" />
          <InputOTPSlot index={2} className="w-[84px] h-[100px] rounded border" />
          <InputOTPSlot index={3} className="w-[84px] h-[100px] rounded border" />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
