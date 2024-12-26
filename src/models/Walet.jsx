import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

// Import file GLTF untuk Walet
import waletScene from "../assets/3d/walet.glb";

export function Walet() {
  // Referensi untuk model
  const birdsRef = useRef();

  // Memuat model dan animasi dari file GLTF
  const { scene, animations } = useGLTF(waletScene);

  // Menghubungkan animasi dengan referensi
  const { actions } = useAnimations(animations, birdsRef);

  // Debugging - Periksa data yang dimuat
  console.log("Scene:", scene); // Periksa scene
  console.log("Animations:", animations); // Periksa animasi
  console.log("Actions:", actions); // Periksa actions

  // Memastikan animasi diputar saat pertama kali dimuat
  useEffect(() => {
    if (actions) {
      const action = actions["Fly"] || Object.values(actions)[0]; // Animasi pertama jika tidak ada "Fly"
      if (action) {
        action.play(); // Memainkan animasi
        console.log("Playing Animation:", action); // Debugging animasi
      } else {
        console.error("No valid action to play");
      }
    } else {
      console.error("No actions found:", actions);
    }
  }, [actions]);

  // Gerakan looping dari kiri ke kanan
  useFrame(({ clock, camera }) => {
    if (birdsRef.current) {
      // Gerakan naik-turun (flapping effect)
      birdsRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.3 + 2;

      // Jika burung melewati sisi kanan layar, pindahkan ke sisi kiri lagi
      if (birdsRef.current.position.x > camera.position.x + 10) {
        birdsRef.current.position.x = camera.position.x - 10; // Muncul kembali dari kiri
      } else {
        birdsRef.current.position.x += 0.05; // Bergerak ke kanan
      }
    }
  });

  // Render model walet
  return (
    <primitive
      ref={birdsRef} // Menghubungkan ref langsung ke model GLTF
      object={scene}
      position={[-5, 2, 0.8]} // Mulai dari kiri
      scale={[0.3, 0.3, 0.3]}
    />
  );
}
