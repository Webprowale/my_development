"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ParentgroupsContainer from "./ParentgroupsContainer";
import SubgroupContainer from "./SubgroupContainer";

const ReportPostModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();

  const handleClose = () => {
    router.push(`${currentPath}`, { scroll: false });
  };

  useEffect(() => {
    if (mode.get("reportpost")) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: any) => {
        if (event.key === "Escape") {
          router.push(`${currentPath}`, { scroll: false });
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  //   report datas
  const [selectedOption, setSelectedOption] = useState({});

  return (
    <>
      {isOpen && (
        <div className="report-modal fixed inset-0 w-full h-screen max-h-screen bg-[#0000002f] grid place-items-center z-[999999] ">
          {!mode.has("subgroup") && (
            <ParentgroupsContainer
              close={handleClose}
              setSelectedOption={setSelectedOption}
            />
          )}

          {mode.has("subgroup") && (
            <SubgroupContainer
              close={handleClose}
              subGroups={selectedOption}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ReportPostModal;
