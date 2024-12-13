import { Suspense } from "react";
import SettingsContainer from "./SettingsContainer";

const Page = () => {
  return (
    <>
      <main className="bg-white rounded min-h-[80vh] md:mb-10">
        <Suspense>
          <SettingsContainer />
        </Suspense>
      </main>
    </>
  );
};

export default Page;
