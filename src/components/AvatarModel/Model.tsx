import React, { Suspense, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SantiModel from '@/public/SantiModel';

// Ref: https://dev.to/nourdinedev/how-to-use-threejs-and-react-to-render-a-3d-model-of-your-self-4kkf
export const Model = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      console.log('wheel scroll prevent: ', event);
      event.preventDefault();
    }
    const element:HTMLCanvasElement = canvasRef.current as any;
    console.log('element: ', element);
    element.addEventListener('wheel', handleScroll);

    return () => {
      element.removeEventListener('wheel', handleScroll);
    };
  }, []);
  return (
    <Canvas
      ref={canvasRef}
      camera={{position: [2, 0, 12.25], fov: 15}}
      style={{
        // backgroundColor: '#111a21',
        width: '50%',
        height: '100vh',
      }}
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <SantiModel position={[0.025, -0.9, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
