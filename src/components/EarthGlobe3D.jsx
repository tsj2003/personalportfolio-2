import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';

function HolographicGlobe() {
    const globeRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (globeRef.current) {
            globeRef.current.rotation.y = time * 0.15;
            globeRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
        }
    });

    // Generate latitude/longitude line loops
    const gridLines = [];
    const segments = 64;
    const numLines = 10;

    // Latitudes (parallels)
    for (let i = 1; i < numLines; i++) {
        const lat = (i / numLines) * Math.PI - Math.PI / 2;
        const radius = Math.cos(lat) * 8;
        const y = Math.sin(lat) * 8;
        const points = [];
        for (let j = 0; j <= segments; j++) {
            const lon = (j / segments) * Math.PI * 2;
            points.push([Math.sin(lon) * radius, y, Math.cos(lon) * radius]);
        }
        gridLines.push(points);
    }

    // Longitudes (meridians)
    for (let i = 0; i < numLines; i++) {
        const lon = (i / numLines) * Math.PI;
        const points = [];
        for (let j = 0; j <= segments; j++) {
            const lat = (j / segments) * Math.PI * 2;
            const radius = Math.sin(lat) * 8;
            const y = Math.cos(lat) * 8;
            points.push([Math.sin(lon) * radius, y, Math.cos(lon) * radius]);
        }
        gridLines.push(points);
    }

    return (
        <group ref={globeRef}>
            {/* Core Earth Sphere */}
            <mesh>
                <sphereGeometry args={[7.8, 32, 32]} />
                <meshStandardMaterial 
                    color="#080808" 
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>

            {/* Latitude and Longitude Grid Lines */}
            {gridLines.map((points, idx) => (
                <Line
                    key={idx}
                    points={points}
                    color="#ffffff"
                    lineWidth={0.6}
                    opacity={0.16}
                    transparent
                />
            ))}

            {/* Glowing nodes (major cities/servers) */}
            {[
                [0, 8, 0], // North pole
                [0, -8, 0], // South pole
                [5, 4, 5],
                [-5, -4, 5],
                [3, 6, -3],
                [-6, 2, -4],
                [7, 0, -3],
                [-2, -5, -6]
            ].map((pos, idx) => (
                <mesh key={idx} position={pos}>
                    <sphereGeometry args={[0.22, 8, 8]} />
                    <meshStandardMaterial 
                        color="#ffffff" 
                        emissive="#ffffff"
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function EarthGlobe3D() {
    return (
        <div className="w-full h-[280px] md:h-[340px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[20, 20, 20]} intensity={1.5} />
                <pointLight position={[-20, -20, -20]} intensity={0.5} />
                <HolographicGlobe />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
