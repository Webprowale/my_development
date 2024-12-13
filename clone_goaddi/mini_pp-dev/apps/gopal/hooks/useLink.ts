import { useEffect, useState } from "react";

export const useLink = (initialLink: string) => {
  const [link, setLink] = useState(initialLink);

  const handleClick = (item: string) => {
    setLink(item);
  };

  useEffect(() => {
    setLink(initialLink);
  }, [initialLink]);

  return { link, handleClick };
};
