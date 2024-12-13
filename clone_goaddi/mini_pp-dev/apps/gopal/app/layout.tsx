import type { Metadata } from "next";
import ReactQueryProvider from "@/lib/query/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go Paddi",
  description: "Go Paddi is under development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
