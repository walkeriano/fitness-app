import "./globals.css";
import "../lib/fontawesome";
import { AuthProvider } from "@/state/auth/auth-provider";

export const metadata = {
  title: "Quesada Coach App - Planes de entrenamiento y nutrición personalizados creados por expertos",
  description: "Descubre Quesada Coach App, Planes de entrenamiento y nutrición personalizados creados por expertos, diseñados para transformar tu cuerpo y tu vida",
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
