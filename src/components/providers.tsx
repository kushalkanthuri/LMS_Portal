"use client";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem
      themes={["light", "dark"]}
      defaultTheme="system"
    >
      {children}
    </ThemeProvider>
  );
}
