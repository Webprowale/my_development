"use client";

import React, {
  
  Suspense,
} from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { toast } from "sonner";
import {
  createPostStepEnum,
  useCreatePostStore,
} from "@/store/useCreatePostStore";
import AddMusic from "./step-2";
import CreatingPost from "./step-1";

interface ICreatePostModal {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  defaultAspectRatio?: number;
  selectedFiles: any;
  setSelectedFiles: any;
  openEditor: any;
  setOpenEditor: any;
}
const CreateNormalPostModal = ({
  setOpen,
  open,
  selectedFiles,
  setOpenEditor,
}: ICreatePostModal) => {

  const { user } = useAuthStore((state) => ({ ...state })) as any;
  const { createPostStep } = useCreatePostStore((state) => ({
    ...state,
  }));

  const onClose = () => {
    if (selectedFiles.length > 0) {
      return toast.warning("Your changes will not be saved");
    }
    setOpen(false);
  };

  function renderStep() {
    switch (createPostStep) {
      case createPostStepEnum.creating:
        return <CreatingPost setOpenEditor={setOpenEditor} />;

      case createPostStepEnum.addMusic:
        return <AddMusic />;

      default:
        break;
    }
  }

  function dynamicDialogClassName() {
    return createPostStep === createPostStepEnum.creating
      ? "max-h-[550px] md:max-w-[650px] p-0"
      : createPostStep === createPostStepEnum.addMusic &&
          "max-h-[650px] h-full md:max-w-[850px] p-0";
  }

  return (
    <Suspense>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          noCloseBtn={true}
          className={cn("transition-all", dynamicDialogClassName())}
        >
          {renderStep()}
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default CreateNormalPostModal;
