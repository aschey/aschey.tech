import type { NextPage } from 'next';
import { Canvas } from '@react-three/fiber';
import { Contour } from '../components/Contour';

const Home: NextPage = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <Contour />
    </Canvas>
  );
};

export default Home;
