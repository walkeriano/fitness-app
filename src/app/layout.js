import "./globals.css";
import "../lib/fontawesome";
import { AuthProvider } from "@/state/auth/auth-provider";

export const metadata = {
  title: "Quesada coach app",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
