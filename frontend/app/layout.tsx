import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppContextProvider from "@/store/app-context-provider";
import ToastProvider from "./toastProvider";
import Provider from "./provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "VoiceWorship",
  description: "Voice-controlled church presentation software",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} text-base`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Provider>
            <AppContextProvider>
              <ToastProvider>{children}</ToastProvider>
            </AppContextProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
