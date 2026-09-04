import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Dynamic Text Decal Generator using Offscreen Canvas
const createLabelTexture = (label) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Solid white background
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(128, 128, 120, 0, Math.PI * 2);
    ctx.fill();

    // Dark label text
    ctx.fillStyle = '#0a0a0a';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Shorten long labels
    let displayLabel = label;
    if (label === 'PostgreSQL') displayLabel = 'Postgres';
    ctx.fillText(displayLabel, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
};

function SkillSphere({ position, label, speed, radiusOffset }) {
    const meshRef = useRef();
    const texture = useMemo(() => createLabelTexture(label), [label]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Orbit motion
        const angle = time * speed + radiusOffset;
        const radius = Math.sqrt(position[0]**2 + position[2]**2);
        
        if (meshRef.current) {
            meshRef.current.position.x = Math.sin(angle) * radius;
            meshRef.current.position.z = Math.cos(angle) * radius;
            // Self-spin
            meshRef.current.rotation.y = time * 0.5;
        }
    });

    return (
        <group>
            {/* Orbital path line */}
            <Line
                points={Array.from({ length: 64 }, (_, i) => {
                    const angle = (i / 63) * Math.PI * 2;
                    const r = Math.sqrt(position[0]**2 + position[2]**2);
                    return [Math.sin(angle) * r, position[1], Math.cos(angle) * r];
                })}
                color="#ffffff"
                lineWidth={0.5}
                opacity={0.06}
                transparent
            />

            {/* Orbiting Tech Ball */}
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[2.0, 32, 32]} />
                <meshStandardMaterial 
                    color="#171717"
                    roughness={0.2}
                    metalness={0.8}
                    map={texture}
                />
            </mesh>
        </group>
    );
}

function SolarSystem() {
    const centralRef = useRef();

    const techSkills = [
        { label: 'Python', position: [7, 0, 7], speed: 0.35, offset: 0 },
        { label: 'React', position: [-9, 0, 5], speed: 0.28, offset: Math.PI / 3 },
        { label: 'Docker', position: [11, 0, -8], speed: 0.22, offset: (2 * Math.PI) / 3 },
        { label: 'Postgres', position: [-13, 0, -11], speed: 0.18, offset: Math.PI },
        { label: 'PyTorch', position: [15, 0, 12], speed: 0.14, offset: (4 * Math.PI) / 3 },
        { label: 'C++', position: [-17, 0, -5], speed: 0.12, offset: (5 * Math.PI) / 3 }
    ];

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (centralRef.current) {
            centralRef.current.rotation.y = time * 0.1;
        }
    });

    return (
        <group>
            {/* Central Core */}
            <mesh ref={centralRef}>
                <sphereGeometry args={[3.2, 32, 32]} />
                <meshStandardMaterial 
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.6}
                    wireframe
                />
            </mesh>

            {/* Orbiting skill balls */}
            {techSkills.map((tech) => (
                <SkillSphere 
                    key={tech.label}
                    position={tech.position}
                    label={tech.label}
                    speed={tech.speed}
                    radiusOffset={tech.offset}
                />
            ))}
        </group>
    );
}

export default function TechBall() {
    return (
        <div className="w-full h-[320px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 18, 30], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[20, 30, 20]} intensity={1.8} />
                <pointLight position={[-20, -30, -20]} intensity={0.6} />
                <SolarSystem />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
