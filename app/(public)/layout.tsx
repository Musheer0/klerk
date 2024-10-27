import type { Metadata } from "next";
import "../globals.css";
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
        <Toaster/>
        <p className="absolute top-0 left-0 bg-orange-500 text-xs">development-mode</p>

{children}
      </body>
    </html>
  );
}
