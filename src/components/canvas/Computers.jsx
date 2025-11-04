import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const car = useGLTF("./future_car_26_gltf/scene.gltf");
  const [wheelRotation, setWheelRotation] = useState(0);

  // Add rotation animation
  useFrame((state) => {
    // Rotate the entire car model
    car.scene.rotation.y += 0.005; // Adjust speed by changing this value
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.5} groundColor="#000000" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
        color="#0066ff"
      />
      <pointLight intensity={1.0} position={[10, 5, 10]} color="#0044aa" />
      <pointLight intensity={0.5} position={[-10, 5, -10]} color="#000000" />
      
      <primitive
        object={car.scene}
        scale={isMobile ? 0.005 : 0.007}
        position={isMobile ? [0, -5.5, -2.2] : [0, -5.75, -1.5]}
        rotation={[0, Math.PI * 0.25, 0]}
        material={{ color: '#ffffff', metalness: 1.0, roughness: 0.05 }}
      />
      {/* Assuming the wheels are separate meshes within the car model */}
      {car.scene.children.map((child, index) => {
        if (child.name.includes("Wheel")) {
          return (
            <mesh key={index} geometry={child.geometry} material={child.material} position={child.position} rotation={[wheelRotation, 0, 0]} />
          );
        }
        return null;
      })}
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [90, 15, 22], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
