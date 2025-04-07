import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Learn Sup",
  description: "next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
