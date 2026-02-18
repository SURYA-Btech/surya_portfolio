"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom shader implementation for performant per-star twinkling
const StarShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        pixelRatio: { value: 1 }
    },
    vertexShader: `
    uniform float time;
    uniform float pixelRatio;
    attribute float aRandom;
    varying float vAlpha;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Twinkle math
      float twinkle = sin(time * 2.0 + aRandom * 10.0) * 0.5 + 0.5;
      vAlpha = 0.2 + 0.6 * twinkle; // Min 0.2, Max 0.8
      
      gl_PointSize = (2.0 + aRandom * 2.0) * pixelRatio * (20.0 / -mvPosition.z);
    }
  `,
    fragmentShader: `
    varying float vAlpha;
    void main() {
      // Circle shape
      vec2 coord = gl_PointCoord - vec2(0.5);
      if(length(coord) > 0.5) discard;
      
      gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
    }
  `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

function CustomStars() {
    const count = 1000;
    const [positions, randoms] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const r = 30 + Math.random() * 20;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            randoms[i] = Math.random();
        }
        return [positions, randoms];
    }, []);

    const shaderRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.time.value = state.clock.getElapsedTime();
            shaderRef.current.uniforms.pixelRatio.value = state.viewport.dpr;
        }
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    count={count}
                    array={randoms}
                    itemSize={1}
                    args={[randoms, 1]}
                />
            </bufferGeometry>
            <primitive
                object={StarShaderMaterial}
                ref={shaderRef}
                attach="material"
            />
        </points>
    );
}

export default function ThreeScene() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <CustomStars />
            </Canvas>
        </div>
    );
}
