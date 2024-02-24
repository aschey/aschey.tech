"use client";

import { SiGithub, SiLinkedin, SiGmail } from "@icons-pack/react-simple-icons";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import Image from "next/image";
import { useRef } from "react";
import { Contour } from "../components/Contour";
import pic from "../../public/me.jpg";

const Link = styled.a`
  display: flex;
  align-items: center;
  border-radius: 5px;
  &:hover {
    transform: scale(1.15);
    filter: brightness(125%);
  }
`;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  return (
    <>
      <div
        style={{
          position: "fixed",
          display: "flex",
          width: "100vw",
          height: "80vh",
          zIndex: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "rgb(17,17,17)",
            display: "flex",
            padding: "0.5em",
            borderRadius: "10px",
            width: "min(500px, 90vw)",
            paddingTop: "1.5em",
            paddingBottom: "1.5em",
            border: "3px solid rgb(40,40,40)",
            boxShadow: "4.0px 8.0px 8.0px hsl(0deg 0% 0% / 0.38)",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "7.5em",
                  height: "7.5em",
                }}
              >
                <Image
                  src={pic}
                  alt="Picture of the author"
                  style={{ borderRadius: "50%" }}
                  fill
                />
              </div>

              <div
                style={{
                  textAlign: "left",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  opacity: 0.8,
                }}
              >
                Austin Schey
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.75em",
                }}
              >
                <Link href="https://github.com/aschey" title="GitHub">
                  <SiGithub color="#d059ee" title="GitHub" />
                </Link>
                <Link
                  href="https://linkedin.com/in/austin-schey"
                  title="LinkedIn"
                >
                  <SiLinkedin
                    color="#5bedf5"
                    title="LinkedIn"
                    style={{ borderRadius: "5px" }}
                  />
                </Link>
                <Link href="mailto:aschey13@gmail.com" title="Email">
                  <SiGmail color="#e03e3e" title="Email" />
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              backgroundClip: "text",
              backgroundSize: "100%",
              fontSize: "22px",
            }}
          >
            Hi, I&apos;m a full-stack developer based in Chicago, IL.
          </div>
        </div>
      </div>
      <Canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          background: "rgb(17,17,17)",
          zIndex: 1,
        }}
      >
        <Contour canvasRef={canvasRef} />
      </Canvas>
    </>
  );
}
