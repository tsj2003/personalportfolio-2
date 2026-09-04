import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';

function HolographicNodes() {
    const groupRef = useRef();

    // Node locations in 3D coordinate space
    const nodes = [
        [12, 0, 0],
        [-8, 8, -4],
        [4, -10, 6],
        [-6, -6, -10],
        [10, 8, 4],
        [-12, -2, 8],
        [0, 12, -4],
        [6, -4, -8]
    ];

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.08;
            groupRef.current.rotation.x = time * 0.04;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Center Core Database */}
            <mesh>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial 
                    color="#ffffff" 
                    emissive="#ffffff"
                    emissiveIntensity={0.7}
                    wireframe
                />
            </mesh>

            {/* Satellite Server Nodes */}
            {nodes.map((pos, idx) => (
                <group key={idx}>
                    <mesh position={pos}>
                        <sphereGeometry args={[0.9, 16, 16]} />
                        <meshStandardMaterial 
                            color="#ffffff" 
                            emissive="#ffffff"
                            emissiveIntensity={0.6}
                        />
                    </mesh>

                    {/* Laser Connections */}
                    <Line 
                        points={[[0, 0, 0], pos]} 
                        color="#ffffff" 
                        lineWidth={1} 
                        opacity={0.25} 
                        transparent 
                    />
                </group>
            ))}
            
            {/* Outer mesh grid wireframe */}
            <Line 
                points={[...nodes, nodes[0]]} 
                color="#ffffff" 
                lineWidth={0.5} 
                opacity={0.12} 
                transparent 
            />
        </group>
    );
}

export default function SystemNetwork3D() {
    return (
        <div className="w-full h-[320px] md:h-[400px] cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 24], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[15, 20, 15]} intensity={1.5} />
                <pointLight position={[-15, -20, -15]} intensity={0.5} />
                <HolographicNodes />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
