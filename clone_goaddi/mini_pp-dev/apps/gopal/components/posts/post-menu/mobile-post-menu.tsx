import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  // DrawerHeader,
  // DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { menuList } from "./data";

type Props = {
  isUser: boolean | string;
};

const MobileMenuPost = ({ isUser }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DotsThreeVertical className="text-3xl w-7 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="min-h-[200px] border-none">
        <div className="mx-auto max-w-xl w-full border-none">
          <div className="p-4 pb-5 ">
            <ul className="flex flex-col gap-y-2">
              {menuList.map((list) => {
                const { icon, text, user } = list;
                return (
                  <React.Fragment key={text}>
                    {(user === Boolean(isUser) || user === null) && (
                      <li
                        key={text}
                        className="flex items-center font-medium gap-2 py-2 px-2 hover:bg-gray-100 rounded-sm"
                      >
                        {icon}
                        <span className="text-sm">{text}</span>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenuPost;
