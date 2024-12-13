"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "@/components/ui/form";
import OtpInput from "react-otp-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createPin, transferToWallet } from "@/axios/endpoints/wallet.endpoint";
import ClipLoader from "react-spinners/ClipLoader";
import { CurrencyNgn, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { addCommasToNumber } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useWalletStore } from "@/store/useWalletStore";

const TransferPinModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const mode = useSearchParams();
  const currentPath = usePathname();
  const { transferDetails, transferUserDetails } = useWalletStore();

  const handleClose = () => {
    router.push("/gopal/wallet?tab=wallet", { scroll: false });
  };

  useEffect(() => {
    if (mode.get("wallet") === "transfer-pin") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: any) => {
        if (event.key === "Escape") {
          router.push("/gopal/wallet?tab=wallet");
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="request grid place-items-end md:place-items-center fixed inset-0 w-full h-screen bg-[#00000089] backdrop-blur-sm z-[99]">
          <div className="request-container bg-white w-full md:w-[35%] p-6 rounded">
            <header className="relative z-10 mb-8">
              <Image
                src={`/assets/modal-vault.svg`}
                width={70}
                height={70}
                className="mb-4"
                alt=""
              />

              <h3 className="font-semibold text-xl mb-2">
                Confirm Transaction
              </h3>
              <p className="text-sm text-[#647995] w-full md:w-[80%] leading-normal">
                Please confirm the details of this transaction to proceed
              </p>
              <X
                size={24}
                weight="bold"
                className="absolute right-0 top-[10px] cursor-pointer"
                onClick={() => {
                  handleClose();
                }}
              />
              <img
                src="/assets/modal-lines.svg"
                className="absolute left-0 right-0 top-0 w-full -z-[1]"
                alt=""
              />
            </header>

            <section className="pin-body">
              <div className="flex flex-col gap-1 mb-4">
                <h3 className="text-sm text-[#676E7E]">From</h3>
                <p className="text-base font-semibold text-[#1D2433]">You</p>
              </div>
              <div className="flex flex-col gap mb-4">
                <h3 className="text-sm text-[#676E7E]">To</h3>
                <p className="text-base font-semibold text-[#1D2433]">
                  @{" "}
                  {`${transferUserDetails?.firstName} ${transferUserDetails?.lastName}`}
                </p>
              </div>

              <div className="flex flex-col gap-1 border-y border-y-[#D0D5DD] my-4 py-3">
                <h3 className="text-sm text-[#676E7E]">
                  Total Transaction Amount
                </h3>
                <p className="text-[1.75rem] font-semibold text-[#1D2433] flex items-center gap-1">
                  <span>NGN</span>
                  <span>
                    {addCommasToNumber(Number(transferDetails?.amount))}
                  </span>
                </p>
              </div>
              <PinForm />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

const PinForm = () => {
  const router = useRouter();
  const optSchema = z.object({
    pin: z.string().min(4, { message: "OTP must be 4 characters" }),
  });

  const [visible, setVisible] = useState<"tel" | "password">("password");

  //   form instance
  const form = useForm<any>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { setTransferDetails, transferMoney } = useWalletStore();
  const transferDetails = useWalletStore((state) => state.transferDetails);
  const { checkBalance, getWalletTransactions } = useWalletStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle pin form submission
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setTransferDetails({ ...transferDetails, pin: data?.pin });

    try {
      const response = await transferToWallet({
        ...transferDetails,
        pin: data?.pin,
      });

      if (response.success) {
        checkBalance();
        getWalletTransactions();
        setIsLoading(false);

        router.push("/gopal/wallet?tab=wallet&wallet=successful-transaction");
      } else {
        setIsLoading(false);
        if (response?.data[0].errors) {
          toast.error(response?.data[0].errors[0]?.pin);
        } else {
          toast.error(response?.message);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className="w-full mb-5 text-center">
                <FormLabel className="font-normal text-center text-[#676E7E] text-sm">
                  Please type in your transaction PIN
                </FormLabel>
                <FormControl>
                  <OtpInput
                    {...field}
                    numInputs={4}
                    inputStyle={{
                      width: "3.4em",
                      textAlign: "center",
                      border: "1px solid #ced4da", // Add border style if needed
                    }}
                    inputType={visible}
                    shouldAutoFocus={true}
                    containerStyle="w-full justify-center space-x-3"
                    renderSeparator={<span></span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="h-20 rounded-sm text-xl focus-within:outline-primary600 focus-visible:outline-primary600"
                        autoComplete="off"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage className="md:text-sm text-xs mt-6" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <Button
              variant="default"
              type="submit"
              className="bg-primary600 text-white w-full py-4 rounded hover:bg-primary700 mt-5 flex items-center justify-center"
            >
              {isLoading ? (
                <ClipLoader
                  size={16}
                  color="#fff"
                  speedMultiplier={1}
                />
              ) : (
                <span>Confirm</span>
              )}
            </Button>
            <Button
              variant="default"
              type="button"
              className="w-full bg-white border border-[#E4E7EC] hover:bg-white text-black shadow-none"
              onClick={() => {
                router.push("/gopal/wallet?tab=wallet");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TransferPinModal;
