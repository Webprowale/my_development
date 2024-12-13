import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Actions = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const bottomThreshold = scrollHeight - windowHeight - 500;
      const isVisible = scrollTop > bottomThreshold;
      setIsVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={cn(
        isVisible
          ? "fixed left-0 right-0 py-2.5 px-16 w-full bg-[#F9FAFB] bottom-0 z-50 flex justify-end border-t border-t-[#D0D5DD] transition-opacity duration-500 animate-animate-up"
          : "hidden",
      )}
    >
      <div className="w-[80%] flex items-center justify-between">
        {children}
      </div>
    </section>
  );
};

export default Actions;
