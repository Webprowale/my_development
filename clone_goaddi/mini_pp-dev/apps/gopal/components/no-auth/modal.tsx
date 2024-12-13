"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Modal from "../goui/modal";
import { UserPlus } from "@phosphor-icons/react";
import { GoAuthButton } from "../goui/button";
import Link from "next/link";

const NoAuthModal = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const mode = useSearchParams().get("mode");

  useEffect(() => {
    if (mode) {
      setOpen(mode === "auth");
    }
  }, [mode, pathName, router]);

  const onClose = () => {
    router.replace("/gopal");
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Suspense>
      <Modal
        isOpen={open}
        onClose={onClose}
        className="sm:max-w-[690px]"
        trigger={<p></p>}
      >
        <img
          className="absolute top-0 w-full h-fit z-[-1]"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />

        <div className="z-10">
          <div className="p-5 bg-primary100 w-fit rounded-[4px]">
            <UserPlus weight="bold" className="w-7 h-7 text-primary600" />
          </div>
          <div className="mt-5">
            <h3 className="text-2xl font-semibold">Sign Up</h3>
            <p className="font-medium mt-2 text-gray-600 max-w-[450px]">
              By continuing, you confirm you have reviewed and agree to the{" "}
              <span className="text-primary600">User Agreement </span>
              and <span className="text-primary600">Privacy Policy.</span>
            </p>
          </div>
          <Link href="/auth/sign-in">
            <GoAuthButton
              type="submit"
              className="w-full py-3 md:text-sm mt-8 font-medium transition-all"
            >
              Sign In
            </GoAuthButton>
          </Link>
          <Link href="/auth/sign-up">
            <GoAuthButton
              type="submit"
              variant="secondary"
              className="w-full py-3 md:text-sm mt-3 font-medium transition-all"
            >
              Sign Up
            </GoAuthButton>
          </Link>
        </div>
      </Modal>
    </Suspense>
  );
};

export default NoAuthModal;
