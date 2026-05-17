import type { Metadata } from "next";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navigation } from "./components/Navigation";
import "../styles/carbon-theme.scss";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ananthakrishna",
  description: "Personal Website and Digital Garden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation />
          <main style={{ marginTop: '3rem', padding: '2rem' }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
