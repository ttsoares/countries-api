import "./globals.css";

import { ServerThemeProvider } from "@wits/next-themes";
import Providers from "./Providers";

import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Countries API with color",
  description:
    "Frontend Mentor - REST Countries API with color theme switcher ",
};

export default function RootLayout({ children }) {
  return (
    <ServerThemeProvider>
      <html lang="en">
        <body className={nunito.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
