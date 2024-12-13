"use client";

import { reportPost } from "@/axios/endpoints/post.endpoint";
import { ReportItemTypes } from "@/interfaces";
import { usePostStore } from "@/store/usePostStore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReportList } from "./data";
import { CaretRight } from "@phosphor-icons/react";

const ReportItem = ({
  id,
  title,
  subtitle,
  setValue,
  list,
  report,
}: ReportItemTypes) => {
  const router = useRouter();
  const params = useSearchParams();
  const reportId = params.get("reportpost");
  const { setReportPostSucess } = usePostStore((state) => state);

  const handleSelect = async () => {
    // if report is passed a parameter then make an API call

    if (report) {
      // API call
      const response = await reportPost({
        postId: reportId,
        reason: title,
        comments: "",
      });

      // if the response is true
      if (response.success === true) {
        router.push("/gopal", { scroll: false });
        setReportPostSucess(true);
      }
    } else {
      const data = ReportList.find((report) => report.id === id);
      setValue(data);

      router.push(`/gopal?reportpost=${reportId}&subgroup=${id}`, {
        scroll: false,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-between cursor-pointer hover:bg-primary100 rounded px-2 py-2"
      onClick={() => handleSelect()}
    >
      <div className="flex flex-col gap-1 w-[92%]">
        <h3 className="font-semibold text-[#1D2433]">{title}</h3>
        <p className="text-sm font-medium text-[#676E7E]">{subtitle}</p>
      </div>

      <CaretRight
        size={28}
        className="text-[#344054]"
      />
    </div>
  );
};

export default ReportItem;
