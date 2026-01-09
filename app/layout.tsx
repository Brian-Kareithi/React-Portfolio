import "./globals.css";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "Brian Kareithi",
  description: "Brian Kareithi - Fullstack Dev & Cybersecurity Enthusiast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative text-white overflow-x-hidden bg-gradient-to-b from-black to-blue-900">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
