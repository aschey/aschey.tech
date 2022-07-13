import type { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import { Contour } from '../components/Contour';
import { useRef } from 'react';

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  return (
    <Canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', position: 'fixed' }}
    >
      <Contour canvasRef={canvasRef} />
    </Canvas>
  );
};

export default Home;
