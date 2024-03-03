import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joaquin Lopez - Edgevanta Takehome",
  description: "The takehome project for Edgevanta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <ConvexClientProvider>
            <main className="flex-1">
              <div className="flex flex-col text-sm pb-9">{children}</div>
            </main>
          </ConvexClientProvider>
        </div>
      </body>
    </html>
  );
}
