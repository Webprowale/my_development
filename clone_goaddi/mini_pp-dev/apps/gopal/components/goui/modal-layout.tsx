import Modal from "@/components/goui/modal";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import React from "react";

const ModalLayout = ({
  isOpen,
  setIsOpen,
  children,
  closeModalRoute,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  closeModalRoute: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  if (isDesktop) {
    return (
      <>
        <Modal
          className="md:w-[600px] w-screen h-auto md:h-max bg-white flex flex-col gap-2"
          isOpen={isOpen}
          onClose={() => {
            router.push(closeModalRoute);
            setIsOpen(false);
          }}
          trigger={<p></p>}
        >
          {children}
        </Modal>
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        <div className="block md:hidden">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
              <div className="px-4 mb-2">{children}</div>
              {/* <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter> */}
            </DrawerContent>
          </Drawer>
        </div>
      </>
    );
  }
};

export default ModalLayout;

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [query]);

  return matches;
}
