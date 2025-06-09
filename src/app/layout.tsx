import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OurHealth: Growing Up Storybook",
  description: "Create personalized storybooks for your child",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-nunito bg-peach-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
