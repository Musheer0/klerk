import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/contex-providers/theme-provider";
import InitUser from "@/components/user/init-user";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Klerk ",
  description: "Authentication made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
             <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        >
          <SessionProvider>
            <Toaster/>
          <InitUser>
{children}
</InitUser>
</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
