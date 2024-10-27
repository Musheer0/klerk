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
          <p className="absolute top-0 left-0 bg-orange-500 text-xs">development-mode</p>
{children}
        </ThemeProvider>
        
      </body>
    </html>
  );
}
