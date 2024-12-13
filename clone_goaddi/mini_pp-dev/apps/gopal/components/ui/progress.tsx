"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
//  here i'm just trying to add a status
  status?: 'pending'|'accepted'|'denied';
};
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  // React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  ProgressProps
>(({ className, value,status='pending', ...props }, ref) => {
  const statusColor ={
    'pending':'#0D6EFD',
    'accepted':'#0F973D',
    'denied':'#D42620',
  }
  const statusValue ={
    'pending':33,
    'accepted':100,
    'denied':15,
  }
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value?value:statusValue[status] )}%)`,backgroundColor:statusColor[status] }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
