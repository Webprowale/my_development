import Link from "next/link";

type Props = {
  isUser: boolean;
};

const RightSection = ({ isUser }: Props) => {
  return (
    <Link href="/gopal/commission">
      <div
        className="xl:flex rounded bg-[#0D6EFD] h-[200px] min-w-0 w-full hidden sticky top-28 right-0  flex-col mb-10"
        style={{ overflowWrap: "break-word" }}
      >
        <div className="w-[400px] p-4 rounded">
          <div className="text-white">
            <div className="pr-12">
              <p className="text-sm font-semibold">
                Earn Commissions for life!
              </p>
              <p className="text-xs mt-2">
                Earn points on every products purchased, share your unique
                referral link and be on the go. Your earnings just got more{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RightSection;
