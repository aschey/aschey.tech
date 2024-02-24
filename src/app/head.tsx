import { Nunito_Sans } from "next/font/google";

const font = Nunito_Sans({ subsets: ["latin"], display: "swap" });

export default function Head() {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <title>Austin Schey</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Austin Schey's personal site" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
