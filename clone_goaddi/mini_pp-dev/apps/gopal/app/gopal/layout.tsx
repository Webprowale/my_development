import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Modals from "@/components/modals";
import ReactQueryProvider from "@/lib/query/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Script from "next/script";
import { redirect } from "next/navigation";
import getUser from "@/lib/get-user";
import NoAuthModal from "@/components/no-auth/modal";
import PaddiChat from "@/components/paddi-ai/chat/floater";
// import axios from "axios";
import SetLocation from "@/components/location";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
      >
        {children}
        {/* <SetLocation /> */}
        <Toaster richColors theme="light" position="top-right" dir="ltr" />
        <Suspense>
          <Modals />
        </Suspense>
      </GoogleOAuthProvider>
      <div className="hidden md:block">
        <PaddiChat />
      </div>
      <Suspense>
        <NoAuthModal />
      </Suspense>
    </>
  );
};

export default Layout;
