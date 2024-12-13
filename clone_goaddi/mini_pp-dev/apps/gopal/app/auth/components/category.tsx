"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Modal from "@/components/goui/modal";
import { ArrowRight, CheckCircle, User } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const CategoryModal = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("gopal");

  const mode = useSearchParams().get("account");

  useEffect(() => {
    if (!mode && pathName.includes("/auth/sign-up")) {
      setOpen(true);
    }
  }, [mode, pathName, router]);

  const onClose = () => {
    setOpen(false);
    router.push(
      `/auth/sign-up?account=${activeCategory.toLowerCase() ?? "gopal"}`,
    );
  };

  if (!open) {
    return null;
  }

  const onChoose = (name: string) => {
    setActiveCategory(name);
    router.replace(`/auth/sign-up?account=${name.toLowerCase()}`);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <Suspense>
      <Modal
        className="h-dvh md:h-[640px] md:max-h-[640px] sm:max-w-[500px]  bg-white flex flex-col gap-2"
        isOpen={open}
        onClose={onClose}
        trigger={<p></p>}
      >
        <div className="w-14 h-14 bg-primary100 rounded-sm grid place-items-center">
          <div className="relative">
            <User size={27} weight="bold" className="text-primary600" />
            <CheckCircle
              className="absolute -bottom-1 -right-2 text-primary600"
              size={14}
              weight="fill"
            />
          </div>
        </div>
        <div className="">
          <h3 className="font-semibold">Select Your GoPaddi Account Type</h3>
          <p className="text-xs font-medium text-slate-500">
            Start Your Gopaddi Journey
          </p>
        </div>
        <div className="grid grid-cols-2 w-full gap-2 mt-7">
          {categories.map((category, index) => {
            const { name, image } = category;
            const isActive = name === activeCategory;
            return (
              <div
                key={index}
                onClick={() => onChoose(name)}
                className="p-1 group cursor-pointer"
              >
                <div
                  className={cn(
                    "p-4 group-hover:bg-primary100 border border-gray-200  group-hover:border-primary600 rounded-sm",
                    isActive ? "bg-primary100 border-primary600" : "bg-none",
                  )}
                >
                  <div
                    className={cn(
                      "group-hover:bg-primary600 rounded-sm transition-all  flex items-center justify-center py-4",
                      isActive ? "bg-primary600" : "bg-primary100",
                    )}
                  >
                    <img
                      src={`/assets/categories/${image}`}
                      className="h-24 group-hover:-rotate-3 group-hover:scale-110 transition-all duration-300"
                      alt=""
                    />
                  </div>
                  <div className="pt-2">
                    <p
                      className={cn(
                        "group-hover:text-primary600  text-center font-medium",
                        isActive ? "text-primary600" : "text-gray-800",
                      )}
                    >
                      {name}
                    </p>

                    <div className="flex justify-center group-hover:animate-move-x group-hover:visible invisible">
                      <ArrowRight
                        size={25}
                        weight="fill"
                        className="text-primary600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </Suspense>
  );
};

export default CategoryModal;

const categories = [
  {
    name: "Gopal",
    image: "pal.svg",
  },
  {
    name: "Gofamily",
    image: "family.svg",
  },
  {
    name: "Goschool",
    image: "school.svg",
  },
  {
    name: "Gobusiness",
    image: "business.svg",
  },
];
