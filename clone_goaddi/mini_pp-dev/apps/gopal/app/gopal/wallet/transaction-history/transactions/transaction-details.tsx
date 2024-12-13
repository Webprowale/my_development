import Image from "next/image";
import Button from "../../components/ft-button";
import ModalIcon from "../../assets/model-icon.png";
import { addCommasToNumber } from "@/utils";
import { format } from "date-fns";

const TransactionDetails = (props: any) => {
  const getTransactionType = (value: string) => {
    if (value === "C") {
      return "Fund received";
    }
    if (value === "D") {
      return "Fund Sent";
    }
  };
  return (
    <div className="bg-white">
      <div className="relative">
        <Image
          src={ModalIcon}
          alt="Modal Icon"
          className="absolute z-50"
        />
        <img
          className="absolute top-0 w-full"
          src="/assets/modal-lines.svg"
          alt="modal-lines"
        />
        <img src="/modal-" />
      </div>

      <div className="mt-28">
        <p className="font-bold text-lg">Transaction Details</p>
        <p className="text-gray-400 text-sm w-[250px]">
          How do you want to add funds to your wallet?
        </p>

        <div className="border mt-5 p-3 text-xs space-y-5">
          {renderDetail("From", "Flutterwave")}
          {renderDetail("To", "You")}
          {renderDetail("Description", `${getTransactionType(props?.type)}`)}
          {renderDetail(
            "Date",
            `${format(props?.time, "MMM d, yyyy; h:mm a")}`,
          )}
          {renderDetail("Transaction Reference", `${props?.reference}`)}
          {renderDetail(
            "Transaction Status",
            "Successful",
            "text-green-700 font-semibold",
          )}
          {renderDetail(
            "Transaction Total",
            `NGN${addCommasToNumber(props?.amount)}`,
            "text-xl font-bold",
          )}
        </div>

        <Button
          onClick={Function}
          text="Report Transaction"
          className="text-white bg-[#D42620] mt-5"
        />
      </div>
    </div>
  );
};

const renderDetail = (label: string, value: string, textStyle = "") => (
  <div
    className="flex items-center justify-between"
    key={label}
  >
    <p>{label}</p>
    <p className={`text-sm ${textStyle}`}>{value}</p>
  </div>
);

export default TransactionDetails;
