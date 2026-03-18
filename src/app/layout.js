import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "rc-slider/assets/index.css";
import AppClientShell from "@/components/layout/AppClientShell";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          fontFamily:
            '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <AppClientShell>{children}</AppClientShell>
      </body>
    </html>
  );
}
