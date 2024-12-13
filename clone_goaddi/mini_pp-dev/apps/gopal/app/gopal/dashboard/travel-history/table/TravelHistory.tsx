"use client";

import { travelHistoryType } from "@/interfaces";
import { Travel, TableColumns } from "./Columns";
import { TravelTable } from "./TravelTable";
import tableData from "@/app/gopal/dashboard/mockdata.json";

const TravelHistory = ({ headerTitle }: travelHistoryType) => {
  return (
    <div className="travel-history bg-white p-6 rounded">
      <div className="travel-table">
        <TravelTable
          data={tableData}
          columns={TableColumns}
          headerTitle={headerTitle}
        />
      </div>
    </div>
  );
};

export default TravelHistory;
