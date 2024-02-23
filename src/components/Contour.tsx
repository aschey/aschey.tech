import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { MutableRefObject, useEffect, useRef, useState } from "react";

interface ContourProps {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
}

export const Contour: React.FC<ContourProps> = ({ canvasRef }) => {
  const ref = useRef<THREE.ShaderMaterial>(null!);

  const [fragShader, setFragShader] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch("/shaders/contour.frag").then(async (s) =>
      setFragShader(await s.text())
    );
  });

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.uniforms["iResolution"].value.x = canvasRef.current.width;
      ref.current.uniforms["iResolution"].value.y = canvasRef.current.height;
      ref.current.uniforms["iTime"].value += delta;
    }
  });

  return (
    fragShader && (
      <mesh>
        <boxGeometry args={[100, 100]} />
        <shaderMaterial
          ref={ref}
          attach="material"
          fragmentShader={fragShader}
          uniforms={{
            iTime: { value: 20 },
            iResolution: {
              value: new Vector3(
                canvasRef.current.width,
                canvasRef.current.height,
                0
              ),
            },
          }}
        />
      </mesh>
    )
  );
};
