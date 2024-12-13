import { IActivityItem } from "@/interfaces";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const ActivityItem = ({ status, name, date }: IActivityItem) => {
  const statusClass = () => {
    if (status === "paid") {
      return "text-[#0F973D] bg-[#E7F6EC]";
    } else if (status === "pending") {
      return "text-[#865503] bg-[#FEF6E7]";
    } else if (status === "declined") {
      return "text-[#9E0A05] bg-[#FBEAE9]";
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`inline-block max-w-max text-[14px] rounded font-medium capitalize py-1 px-3 ${statusClass()}`}
      >
        {status}
      </div>
      <h3 className="text-[#1D2433] font-medium">{name}</h3>
      <p className="text-[#647995] text-[14px] flex items-center gap-1">
        <CalendarBlank size={18} weight="light" />
        {date}
      </p>
    </div>
  );
};

export default ActivityItem;
