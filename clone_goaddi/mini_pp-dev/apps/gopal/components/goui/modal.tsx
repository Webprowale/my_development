"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Gallery } from "@/assets/icons";
import { Children, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import React from "react";
import { Drawer, DrawerContent } from "../ui/drawer";

type ModalProps = {
  children: React.ReactNode;
  trigger: React.ReactElement;
  onClose?: () => void;
  isOpen: boolean;
  className?: string;
  left?: boolean;
};

const Modal = ({
  children,
  trigger,
  onClose,
  isOpen,
  left,
  className,
}: ModalProps) => {
  const onChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          //@ts-ignore
          left={left ? true : false}
          className={cn("sm:max-w-[800px]", className)}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  if (isMobile) {
    return (
      <>
        <div className="block md:hidden">
          <Drawer open={isOpen} onOpenChange={onChange}>
            <DrawerContent>
              <div className="px-4 mb-2">{children}</div>
              {/* <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter> */}
            </DrawerContent>
          </Drawer>
        </div>
      </>
    );
  }
};

export default Modal;

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [query]);

  return matches;
}
