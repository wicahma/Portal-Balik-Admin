import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import { ThemeProvider } from "@/components/materials/index";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portal Balik",
  description: "Apliaksi Admin Panel Portal Balik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
