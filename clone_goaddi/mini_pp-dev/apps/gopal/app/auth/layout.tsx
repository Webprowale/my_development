import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
    >
      {children}
      {/* <GopaddiAI /> */}
      <Toaster richColors theme="light" position="top-right" dir="ltr" />
    </GoogleOAuthProvider>
  );
};

export default Layout;
