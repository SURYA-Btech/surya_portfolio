'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';


interface CircularGalleryProps {
    items: { image: string;[key: string]: any }[];
    onSelect?: (item: any) => void;
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    scrollSpeed?: number;
    scrollEase?: number;
}

// ... GalleryItem definition remains mostly same but generic ...

function GalleryItem({
    index,
    total,
    radius,
    url,
    item,
    hovered,
    setHovered,
    onSelect,
    rotationSpeed,
    easeFactor,
    borderRadius,
    rotationRef,
}: {
    index: number;
    total: number;
    radius: number;
    url: string;
    item: any;
    hovered: number | null;
    setHovered: (index: number | null) => void;
    onSelect?: (item: any) => void;
    rotationSpeed: number;
    easeFactor: number;
    borderRadius: number;
    rotationRef: React.MutableRefObject<number>;
}) {
    // ... useFrame logic ...
    // Note: I will need to insert the full GalleryItem body here or use multi-replace if I want to keep it clean.
    // For now, I will assume the tool replaces the entire block or I provide enough context.
    // Let's rewrite GalleryItem to be safe.

    const ref = useRef<any>(null!);
    const group = useRef<THREE.Group>(null!);

    const angleStep = (Math.PI * 2) / total;
    const baseAngle = index * angleStep;

    useFrame((state, delta) => {
        // Use the shared rotation value instead of global time
        const currentAngle = baseAngle + rotationRef.current;

        group.current.position.x = Math.sin(currentAngle) * radius;
        group.current.position.z = Math.cos(currentAngle) * radius;

        group.current.lookAt(state.camera.position);

        // Add specific rotation to face center/camera better if needed, 
        // but lookAt usually handles billboard effect.

        const isHovered = hovered === index;
        const s = isHovered ? 1.2 : 1;

        const lambda = 1 / (easeFactor || 0.1);
        // @ts-ignore
        ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, 3 * s, lambda, delta);
        // @ts-ignore
        ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, 4 * s, lambda, delta);
    });

    return (
        <group ref={group}>
            <Image
                ref={ref}
                url={url}
                transparent
                side={THREE.DoubleSide}
                onPointerOver={() => {
                    setHovered(index);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(null);
                    document.body.style.cursor = 'auto';
                }}
                onClick={() => onSelect && onSelect(item)}
                scale={[3, 4, 1]}
                // @ts-ignore
                radius={borderRadius || 0}
            />
        </group>
    );
}

function Scene({
    items,
    onSelect,
    bend = 0,
    scrollSpeed = 1,
    scrollEase = 0.15,
    borderRadius = 0.05
}: {
    items: { image: string;[key: string]: any }[];
    onSelect?: (item: any) => void;
    bend?: number;
    scrollSpeed?: number;
    scrollEase?: number;
    borderRadius?: number;
}) {
    const [hovered, setHovered] = useState<number | null>(null);
    const radius = 5 + bend * 0.1;
    const rotationSpeed = scrollSpeed * 0.05;
    const rotationRef = useRef(0);

    useFrame((state, delta) => {
        if (hovered === null) {
            rotationRef.current += delta * rotationSpeed;
        }
    });

    return (
        <>
            {items.map((item, i) => (
                <GalleryItem
                    key={i}
                    index={i}
                    total={items.length}
                    radius={radius}
                    url={item.image}
                    item={item}
                    hovered={hovered}
                    setHovered={setHovered}
                    onSelect={onSelect}
                    rotationSpeed={rotationSpeed}
                    easeFactor={scrollEase}
                    borderRadius={borderRadius}
                    rotationRef={rotationRef}
                />
            ))}
        </>
    );
}

export default function CircularGallery({
    items,
    onSelect,
    bend = 0,
    textColor = '#ffffff',
    borderRadius = 0.05,
    scrollSpeed = 1,
    scrollEase = 0.15,
}: CircularGalleryProps) {

    return (
        <Canvas camera={{ position: [0, 0, 12], fov: 35 }}>
            <fog attach="fog" args={['#171720', 10, 30]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Scene
                items={items}
                onSelect={onSelect}
                bend={bend}
                scrollSpeed={scrollSpeed}
                scrollEase={scrollEase}
                borderRadius={borderRadius}
            />
        </Canvas>
    );
}
