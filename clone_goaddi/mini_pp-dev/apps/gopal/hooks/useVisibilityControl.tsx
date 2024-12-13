import { useState } from "react";

export const useVisibilityControl = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);

  return { open, setOpen, handleClick };
};
