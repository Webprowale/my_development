import Button from "../../components/ft-button";
import { At } from "../../assets/svg/at";
import { CopyIcon } from "../../assets/svg/copy-icon";
import WalletModal from "../../components/wallet-modal";

const ShareUser = ({ closeModal }: { closeModal: Function }) => {
  return (
    <WalletModal
      title="Share your username"
      text="Your friends on GoPaddi can send money to you through your username"
      icon={<At />}
      children={
        <>
          <div className="flex items-center justify-center mt-8 text-2xl font-bold pl-6 h-[57px] w-full border space-x-10">
            <p>@Human123</p>
            <CopyIcon />
          </div>

          <Button
            onClick={Function}
            text="Next"
            className="bg-primary600 text-white mt-5"
          />
          <Button
            onClick={closeModal}
            text="Cancel"
            className="bg-white text-black border mt-2"
          />
        </>
      }
    />
  );
};

export default ShareUser;
