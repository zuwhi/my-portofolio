import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import earthScene from "../assets/3d/earth.glb";

export function Earth({ isRotating, setIsRotating, setCurrentStage, currentFocusPoint, ...props }) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(earthScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Touch events for mobile devices
  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      {/* <mesh castShadow receiveShadow geometry={nodes.Plane003.geometry} material={materials["Light yellow"]} position={[-1.228, 0.09, 0.207]} rotation={[1.533, 0.396, 0.044]} scale={[0.009, 0.041, 0.034]} />
      <mesh castShadow receiveShadow geometry={nodes.Plane001.geometry} material={materials.Blue} position={[1.278, -0.237, 0.218]} rotation={[1.53, -0.265, 0.056]} scale={[0.009, 0.042, 0.034]} />
      <mesh castShadow receiveShadow geometry={nodes.Plane002.geometry} material={materials["Light green"]} position={[0.89, -1.042, 0.265]} rotation={[1.53, -0.265, 0.056]} scale={[0.009, 0.04, 0.033]} />
      <mesh castShadow receiveShadow geometry={nodes.Plane004.geometry} material={materials["Darker green"]} position={[0.274, 1.268, 0.136]} rotation={[1.53, -0.265, 0.056]} scale={[0.01, 0.048, 0.039]} />
      <mesh castShadow receiveShadow geometry={nodes.BezierCircle001.geometry} material={materials["Light green"]} position={[-0.863, -0.22, 1.354]} rotation={[-1.067, -1.451, -2.835]} scale={0.035} />
      <mesh castShadow receiveShadow geometry={nodes.Cone002.geometry} material={materials.Blue} position={[-0.6, 0.902, 1.371]} rotation={[0.014, 0.938, -0.405]} scale={[-0.056, 0.043, 0.056]} />
      <mesh castShadow receiveShadow geometry={nodes.Star001.geometry} material={materials["Light yellow"]} position={[0.703, 0.872, 1.252]} rotation={[-1.571, 0.052, 0.012]} scale={[0.062, 0.045, -0.062]} />
      <mesh castShadow receiveShadow geometry={nodes.Star002.geometry} material={materials["Light yellow"]} position={[-0.657, -0.676, 1.344]} rotation={[-1.571, 0.052, 0.012]} scale={[0.077, 0.057, -0.077]} /> */}
      <group position={[-0.049, 0, 0]} scale={20.04}>
        <mesh castShadow receiveShadow geometry={nodes.Sphere.geometry} material={materials.Blue} position={[0.047, 0, 0]} rotation={[-0.99, -0.863, -0.747]} scale={1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere001.geometry} material={materials["Darker green"]} position={[0.047, 0, 0]} rotation={[-0.99, -0.863, -0.747]} scale={1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere002.geometry} material={materials["Darker green"]} position={[0.047, 0, 0]} rotation={[0.076, -0.822, 2.426]} scale={1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere004.geometry} material={materials["Darker green"]} position={[0.047, 0, 0]} rotation={[-0.99, -0.863, -0.747]} scale={1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere005.geometry} material={materials["Light green"]} position={[0.047, 0, 0]} rotation={[-0.99, -0.863, -0.747]} scale={1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere006.geometry} material={materials["Light green"]} position={[0.047, 0, 0]} rotation={[0.076, -0.822, 2.426]} scale={1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere011.geometry} material={materials["Darker green"]} position={[0.057, 0, 0.083]} rotation={[0.99, 0.863, 2.394]} scale={-1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere012.geometry} material={materials["Darker green"]} position={[0.057, 0, 0.083]} rotation={[0.99, 0.863, 2.394]} scale={-1.08} />
        <mesh castShadow receiveShadow geometry={nodes.Sphere013.geometry} material={materials["Light green"]} position={[0.057, 0, 0.083]} rotation={[0.99, 0.863, 2.394]} scale={-1.08} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes.Sphere003.geometry} material={materials.White} position={[-0.442, 0.487, 1.369]} rotation={[0, -0.58, -0.037]} scale={[0.143, 0.089, 0.089]} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere007.geometry} material={materials.White} position={[0.894, 0.518, 1.006]} rotation={[-0.499, 0.598, 0.388]} scale={[0.071, 0.044, 0.044]} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere008.geometry} material={materials.White} position={[-0.586, -0.37, 1.061]} rotation={[1.242, 0.124, 0.328]} scale={[0.071, 0.044, 0.044]} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere009.geometry} material={materials.White} position={[0.795, -0.424, 1.417]} rotation={[0, 0.122, -0.058]} scale={[0.134, 0.083, 0.083]} />
      <mesh castShadow receiveShadow geometry={nodes.Sphere010.geometry} material={materials.White} position={[0.355, 0.083, 1.389]} rotation={[0, -0.003, -0.06]} scale={[0.066, 0.041, 0.041]} />
    </a.group>
  );
}
