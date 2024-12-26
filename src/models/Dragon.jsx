import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

// Import file GLTF
import birdScene from "../assets/3d/dragon.glb";

export function Dragon() {
  const birdRef = useRef();

  // Memuat model dan animasi dari file GLTF
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);

  // Memainkan animasi saat pertama kali dimuat
  useEffect(() => {
    if (actions) {
      const action = actions["Take 001"] || Object.values(actions)[0]; // Animasi pertama
      if (action) action.play();
    } else {
      console.error("No actions found:", actions);
    }
  }, [actions]);

  // Mengatur arah gerakan awal dari kiri ke kanan
  let movingRight = true;

  useFrame(({ clock, camera }) => {
    if (birdRef.current) {
      birdRef.current.position.x = 15;
      birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 1;

      // Cek batas kiri dan kanan
      if (movingRight && birdRef.current.position.x > camera.position.x + 50) {
        movingRight = false; // Berbalik arah ke kiri
        birdRef.current.rotation.y = Math.PI; // Rotasi untuk menghadap kiri
      } else if (!movingRight && birdRef.current.position.x < camera.position.x - 10) {
        movingRight = true; // Berbalik arah ke kanan
        birdRef.current.rotation.y = 0; // Rotasi untuk menghadap kanan
      }

      // Bergerak sesuai arah
      if (movingRight) {
        birdRef.current.position.x -= 0.005; // Ke kanan
        birdRef.current.position.z -= 0.05; // Maju sedikit
      } else {
        birdRef.current.position.x -= 0.05; // Ke kiri
        birdRef.current.position.z += 0.1; // Mundur sedikit
      }
    }
  });

  return (
    <primitive
      ref={birdRef}
      object={scene}
      position={[-15, 2, 1]} // Posisi awal dari kiri
      scale={[0.003, 0.003, 0.003]}
    />
  );
}
