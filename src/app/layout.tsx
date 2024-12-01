import { Nunito_Sans } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";
import { Metadata } from "next";

const font = Nunito_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Austin Schey",
  description: "Austin Schey's personal site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        style={{
          margin: 0,
          color: "#dfebeb",
          background: "rgb(17,17,17)",
        }}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
