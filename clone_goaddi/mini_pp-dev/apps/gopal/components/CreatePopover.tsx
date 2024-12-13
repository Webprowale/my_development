import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateDiary } from "./create/CreateDiaryPost";
import { Book, NotePencil } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Modal from "@/components/goui/modal";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  icon?: any;
  name?: string;
};
export function CreatePopover({ name, icon }: Props) {
  const { user } = useAuthStore((state) => ({ ...state })) as any;

  const user_id = user.userId;
  console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const onClose = () => {
    // router.push(`/gopal//profile/${}?tab=diary`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="border-0 border-none hover:bg-transparent"
          >
            <li className="flex flex-col items-center text-slate-600 gap-1 cursor-pointer">
              {icon}
              <p className="text-xs">{name}</p>
            </li>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[214px] h-[132px]">
          <div>
            <Link
              // onClick={() => router.push("/?mode=create")}
              href="/gopal?mode=create"
              className="cursor-pointer"
            >
              <Button
                variant="outline"
                className={`border-none border-0 flex justify-start items-center gap-2 w-full text-xs`}
              >
                <NotePencil size={24} /> <p>Create a Post</p>
              </Button>
            </Link>
            {/* <Link
              onClick={() => router.push("/?mode=create")}
              href="/gopal?mode=create-da"
              className="cursor-pointer"
            > */}
            <Button
              variant="outline"
              className={`border-none border-0 text-xs flex justify-start items-center gap-2 w-full`}
              onClick={() => {
                setIsModalOpen(true);
                // router.push("/gopal?mode=create-diary");
              }}
            >
              <Book size={24} /> <p>Create a Diary Post</p>
            </Button>
            {/* </Link> */}
            {/* <CreateDiary text="Create a Diary Post" icon={<Book size={24} />} /> */}

            <Modal
              isOpen={isModalOpen}
              onClose={onClose}
              trigger={<button></button>}
              className="my-modal sm:max-w-[600px]"
              left={false}
            >
              <CreateDiary
                onClose={onClose}
                isOpen={isModalOpen}
                text="Create a Diary Post"
                icon={<Book size={24} />}
              />
            </Modal>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
// ?mode=create
