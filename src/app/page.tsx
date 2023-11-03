"use client";

import { Inter } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Contour } from "../components/Contour";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  return (
    <Canvas
      ref={canvasRef}
      style={{ width: "100vw", height: "100vh", position: "fixed" }}
    >
      <Contour canvasRef={canvasRef} />
    </Canvas>
  );
}
