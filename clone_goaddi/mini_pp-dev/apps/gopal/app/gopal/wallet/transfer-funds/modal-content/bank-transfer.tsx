import { useState } from "react";
import Link from "next/link";
import WalletModal from "../components/wallet-modal";
import Button from "../../components/ft-button";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { setISODay } from "date-fns";
import {
  searchUsername,
  transferToWallet,
} from "@/axios/endpoints/wallet.endpoint";
import { useWalletStore } from "@/store/useWalletStore";
import { toast } from "sonner";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils";

const BankTransfer = ({ closeModal }: { closeModal: Function }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const {
    transactionHistory,
    transferDetails,
    setTransferDetails,
    setTransferUserDetails,
    balanceData,
  } = useWalletStore();
  const router = useRouter();
  const [searchBody, setSearchBody] = useState({
    keyword: "",
  });
  const [isSufficient, setIsSufficient] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // search for user by name
  const searchUser = async () => {
    try {
      const response = await searchUsername(searchBody);

      if (response?.success) {
        setAccounts(response.data[0]?.usersData);
      }
    } catch (error) {
      setAccounts([]);
      console.log(error);
    }
  };

  // handle transferring money to wallet
  const transferMoney = async () => {
    try {
      if (
        transferDetails?.amount === null ||
        transferDetails.transferUserId === ""
      ) {
        toast.error("Name or amount cannot be empty");
        return;
      }

      setIsLoading(true);
      const response = await transferToWallet(transferDetails);

      setIsLoading(false);
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <WalletModal
      title="Transfer Funds"
      text="Send money to any GoPaddi user by their username or email address"
      children={
        <div className="flex flex-col items-center space-y-3 mt-5 w-full">
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm">
              Recipient username or email address
            </label>
            <div className="relative">
              <input
                onChange={(e) => {
                  setSearchBody({ ...searchBody, keyword: e.target.value });
                  searchUser();
                }}
                className="rounded w-full border h-[56px] text-sm p-3"
                placeholder="Enter account name"
                value={searchBody.keyword}
                onFocus={() => {
                  setIsActive(true);
                }}
                type="text"
              />
              {isActive && searchBody?.keyword !== "" && (
                <div>
                  {accounts?.length > 0 ? (
                    <div className="search-box absolute left-0 top-[110%] right-0 min-h-[100px] max-h-[200px] overflow-auto scrollbar-thin p-2 flex flex-col gap-2 z-50 bg-white border rounded active:bg-red">
                      {accounts?.map((user: any, index: number) => (
                        <SearchUser
                          key={index}
                          firstname={user?.firstName}
                          lastname={user?.lastName}
                          userName={user?.userName}
                          picture={user?.picture}
                          click={() => {
                            setSearchBody({
                              ...searchBody,
                              keyword: `${user?.firstName} ${user?.lastName}`,
                            });
                            setTransferDetails({
                              ...transferDetails,
                              transferUserId: user?.id,
                            });
                            setTransferUserDetails({
                              firstName: user?.firstName,
                              lastName: user?.lastName,
                            });
                            setIsActive(false);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="absolute left-0 top-[110%] right-0 min-h-[100px] p-2 flex flex-col items-center justify-center gap-2 z-10 bg-white border rounded">
                      <MagnifyingGlass
                        size={32}
                        weight="fill"
                        className="text-primary100"
                      />
                      <h3>No search result</h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm">Amount to transfer</label>
            <input
              onChange={(e) => {
                if (Number(e.target.value) < balanceData?.availableBalance) {
                  setIsSufficient(true);
                }
                if (Number(e.target.value) > balanceData?.availableBalance) {
                  setIsSufficient(false);
                }

                setTransferDetails({
                  ...transferDetails,
                  amount: e.target.value,
                });
              }}
              className="rounded border h-[56px] text-sm p-3"
              placeholder="Enter an amount"
              type="number"
            />
            {!isSufficient && (
              <span className="text-xs text-red-500">
                Amount cannot be more than wallet balance
              </span>
            )}
          </div>

          <Button
            onClick={() => {
              // check if the amount to be transferred is 0 or null
              if (
                transferDetails?.amount === null ||
                Number(transferDetails?.amount) == 0
              ) {
                toast.error("Amount cannot be more than wallet balance");
                return;
              }

              // check if amount to be transferred is greater than balance
              if (
                Number(transferDetails?.amount) > balanceData?.availableBalance
              ) {
                setIsSufficient(false);
                toast.error("Amount cannot be more than wallet balance");
                return;
              }

              router.push("/gopal/wallet?tab=wallet&wallet=confirm-transfer");
            }}
            text="Next"
            className={`text-white w-full mt-5 ${transferDetails?.amount && transferDetails?.transferUserId ? "bg-primary600 cursor-pointer pointer-events-auto" : "bg-[#CFE2FF] cursor-not-allowed pointer-events-none"}`}
            isLoading={isLoading}
          />

          <Button
            onClick={() => {
              router.push("/gopal/wallet?tab=wallet");
            }}
            text="Cancel"
            className="bg-white text-black border mt-2 w-full"
          />
        </div>
      }
    />
  );
};

const SearchUser = ({
  firstname,
  lastname,
  userName,
  picture,
  click,
}: {
  firstname: string;
  lastname: string;
  userName?: string;
  picture?: string;
  click?: any;
}) => {
  return (
    <div
      className="flex gap-3 cursor-pointer hover:bg-primary100 p-2 rounded active:bg-primary200"
      role="button"
      onClick={click}
    >
      <Avatar>
        <AvatarImage
          src={picture}
          alt={`${firstname} avatar`}
          width={50}
          height={50}
        />
        <AvatarFallback>
          {getInitials(`${firstname} ${lastname}`)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold">{`${firstname} ${lastname}`}</h3>
        <p className="text-xs text-[#676E7E]">@{userName || "null"}</p>
      </div>
    </div>
  );
};

export default BankTransfer;
