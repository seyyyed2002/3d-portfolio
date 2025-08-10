import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import { Float, ContactShadows } from '@react-three/drei'

function SpinningObject() {
  const meshRef = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.6
    meshRef.current.rotation.x += delta * 0.2
  })
  return (
    <mesh ref={meshRef} castShadow position={[0, 0.8, 0]}>
      <torusKnotGeometry args={[0.7, 0.25, 128, 16]} />
      <meshStandardMaterial color="#10b981" roughness={0.25} metalness={0.4} />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Float rotationIntensity={0.25} floatIntensity={0.7}>
        <SpinningObject />
      </Float>

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <ContactShadows position={[0, 0, 0]} blur={2.5} opacity={0.5} scale={8} />
    </>
  )
}