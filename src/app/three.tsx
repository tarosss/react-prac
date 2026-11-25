import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function CameraControls() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    // controls.enableDamping = true;
    return () => console.log();
  }, []);

  return null;
}

function RotatingSphere() {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <meshStandardMaterial color="#7c5cff" roughness={0.35} metalness={0.15} />
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
}
function RotatingSphere2() {
  return (
    <mesh position={[2, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshLambertMaterial color="#aaa9b0" />
    </mesh>
  );
}

function Tree() {
  return (
    <group position={[-2.2, 0, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.14, 0.2, 1, 12]} />
        <meshStandardMaterial color="#8b5a2b" />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <coneGeometry args={[0.8, 1.4, 16]} />
        <meshStandardMaterial color="#2f9e62" />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[0.62, 1.2, 16]} />
        <meshStandardMaterial color="#248451" />
      </mesh>
      <mesh position={[0, 2.25, 0]}>
        <coneGeometry args={[0.43, 0.95, 16]} />
        <meshStandardMaterial color="#176b43" />
      </mesh>
    </group>
  );
}

function House() {
  return (
    <group position={[3, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <meshStandardMaterial color="#d5921e" />
        <boxGeometry args={[2, 3, 3.5]} />
      </mesh>
    </group>
  )
}
export default function Three() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b1120', color: '#e2e8f0', padding: 24, boxSizing: 'border-box' }}>
      <section style={{ width: 'min(900px, 100%)' }}>
        <h1 style={{ fontSize: 28, margin: '0 0 8px', color: 'inherit' }}>Three.js scene</h1>
        <p style={{ margin: '0 0 16px', color: '#94a3b8' }}>Canvas 上をドラッグするとカメラが動きます。木は円柱と円錐でできています。</p>
        <div style={{ height: 'min(65vh, 560px)', minHeight: 320, overflow: 'hidden', borderRadius: 16, boxShadow: '0 24px 80px #0008' }}>
          <Canvas camera={{ position: [3, 2.5, 5], fov: 45 }} >
            <CameraControls />
            <RotatingSphere />

            <Tree />
            <House />
            <color attach="background" args={['#101827']} />
            <hemisphereLight args={['#dbeafe', '#263047', 2]} />
            <directionalLight position={[3, 4, 5]} intensity={3} />
            <gridHelper args={[8, 16, '#64748b', '#334155']} position={[0, -1.15, 0]} />
          </Canvas>
        </div>
      </section>
    </main>
  );
}
