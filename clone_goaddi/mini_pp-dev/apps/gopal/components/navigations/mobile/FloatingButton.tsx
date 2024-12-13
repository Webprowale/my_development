"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Book, NotePencil, Plus } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FloatingButton = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <>
      {currentPath === "/gopal" && (
        <Drawer>
          <DrawerTrigger>
            <button className="bg-primary600 text-white w-[55px] h-[55px] rounded-full grid place-items-center fixed bottom-20 right-4 z-50">
              <Plus size={20} />
            </button>
          </DrawerTrigger>
          <DrawerContent className="px-6 pb-5">
            <DrawerHeader className="flex flex-col gap-1 text-left p-0 mb-6">
              <DrawerTitle className="text-base">Select Post</DrawerTitle>
              <DrawerDescription>
                Select what medium to post about?
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-6 my-3">
              <DrawerClose asChild>
                <Link
                  href={"#"}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <NotePencil size={20} />
                  <span>Create Post</span>
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link
                  href={"#"}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Book size={20} />
                  <span>Create a diary Post</span>
                </Link>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default FloatingButton;
