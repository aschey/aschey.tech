"use client";

import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideControls, setHideControls] = useState(true);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "s") {
        setHideControls((s) => !s);
      }
    });
  }, []);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
