import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/contex-providers/theme-provider";


export const metadata: Metadata = {
  title: "Klerk | Login",
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
        className={` antialiased w-full h-screen flex items-center justify-center`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        >
{children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}
