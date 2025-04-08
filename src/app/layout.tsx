import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LearnSup",
  description: "app",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
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
          <Navbar />
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
            }}
          />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
