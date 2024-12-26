import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

// Import file GLTF
import birdScene from "../assets/3d/crow.glb";

export function Crow() {
  // Referensi untuk model
  const birdRef = useRef();

  // Memuat model dan animasi dari file GLTF
  const { scene, animations } = useGLTF(birdScene);

  // Menghubungkan animasi dengan referensi
  const { actions } = useAnimations(animations, birdRef);

  // Memastikan animasi diputar saat pertama kali dimuat
  useEffect(() => {
    if (actions) {
      const action = actions["Take 001"] || Object.values(actions)[0]; // Animasi pertama jika tidak ada "Take 001"
      if (action) action.play();
    } else {
      console.error("No actions found:", actions);
    }
  }, [actions]);

  // Gerakan looping dari kanan ke kiri
  useFrame(({ clock, camera }) => {
    if (birdRef.current) {
      // Gerakan naik-turun (flapping effect)
      birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 1;

      // Jika burung melewati sisi kiri layar, pindahkan ke sisi kanan lagi
      if (birdRef.current.position.x < camera.position.x - 10) {
        birdRef.current.position.x = camera.position.x + 10; // Muncul kembali dari kanan
      } else {
        birdRef.current.position.x -= 0.05; // Bergerak ke kiri
      }
    }
  });

  return (
    <primitive
      ref={birdRef} // Menghubungkan ref langsung ke model GLTF
      object={scene}
      position={[5, 2, 0.8]} // Mulai dari kanan
      scale={[0.003, 0.003, 0.003]}
    />
  );
}
