import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

const SECTION_NODES = [
    { id: 'work', label: 'Work', position: [-7, 0, -7], height: 6, color: '#c9a227' },
    { id: 'projects', label: 'Projects', position: [5, 0, 3], height: 8, color: '#4a7c8c' },
    { id: 'proof', label: 'Proof', position: [-2, 0, 8], height: 7, color: '#c9a227' },
    { id: 'contact', label: 'Contact', position: [8, 0, -5], height: 5, color: '#4a7c8c' }
];

function CameraRig() {
    const targetCamPos = useMemo(() => new THREE.Vector3(), []);
    const targetLookAt = useMemo(() => new THREE.Vector3(), []);
    const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const orbitAngle = time * 0.012;
        const swayX = state.pointer.x * 8;
        const swayY = state.pointer.y * 4 + 14;
        const radius = 30;

        targetCamPos.set(
            Math.sin(orbitAngle) * radius + swayX,
            swayY,
            Math.cos(orbitAngle) * radius
        );
        targetLookAt.set(0, 1.5, 0);

        state.camera.position.lerp(targetCamPos, 0.035);
        currentLookAt.current.lerp(targetLookAt, 0.035);
        state.camera.lookAt(currentLookAt.current);
    });

    return null;
}

function TransitLoop() {
    const carRef = useRef();
    const points = useMemo(() => {
        const pts = [];
        const radius = 14;
        for (let i = 0; i <= 64; i++) {
            const theta = (i / 64) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.sin(theta) * radius, -1.4, Math.cos(theta) * radius));
        }
        return pts;
    }, []);

    const lineGeometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    useFrame((state) => {
        if (!carRef.current) return;
        const t = (state.clock.getElapsedTime() * 0.1) % 1;
        const angle = t * Math.PI * 2;
        const radius = 14;
        carRef.current.position.set(Math.sin(angle) * radius, -1.25, Math.cos(angle) * radius);
        carRef.current.rotation.y = angle + Math.PI / 2;
    });

    return (
        <group>
            <line geometry={lineGeometry}>
                <lineBasicMaterial color="#4a7c8c" opacity={0.22} transparent />
            </line>
            <mesh ref={carRef}>
                <boxGeometry args={[0.45, 0.2, 0.85]} />
                <meshBasicMaterial color="#c9a227" wireframe />
                <pointLight color="#c9a227" intensity={0.9} distance={3} />
            </mesh>
        </group>
    );
}

function Skyscraper({ position, width = 2, height = 5, depth = 2, color = '#c9a227' }) {
    const meshY = height / 2 - 1.5;

    return (
        <group position={[position[0], meshY, position[2]]}>
            <mesh>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color="#0a0c10"
                    transparent
                    opacity={0.9}
                    roughness={0.25}
                    metalness={0.75}
                />
            </mesh>
            <mesh>
                <boxGeometry args={[width * 1.01, height * 1.01, depth * 1.01]} />
                <meshBasicMaterial color={color} wireframe transparent opacity={0.16} />
            </mesh>
        </group>
    );
}

export default function CityBackground({ onNodeClick }) {
    const buildings = useMemo(() => {
        const list = [];
        const colors = ['#c9a227', '#4a7c8c', '#8b8680'];

        for (let i = 0; i < 48; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 6 + Math.random() * 20;
            const x = Math.sin(angle) * distance;
            const z = Math.cos(angle) * distance;

            const nearNode = SECTION_NODES.some((node) => {
                const [nx, , nz] = node.position;
                return Math.abs(x - nx) < 3 && Math.abs(z - nz) < 3;
            });
            if (nearNode) continue;

            list.push({
                id: i,
                position: [x, 0, z],
                width: 1.2 + Math.random() * 1.8,
                height: 3 + Math.random() * 11,
                depth: 1.2 + Math.random() * 1.8,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        return list;
    }, []);

    return (
        <div className="scene-city bg-void">
            <Canvas
                camera={{ fov: 48, near: 0.1, far: 1000, position: [0, 16, 28] }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 1.5]}
            >
                <fog attach="fog" args={['#07090d', 14, 48]} />
                <gridHelper args={[80, 40, '#c9a227', '#151a22']} position={[0, -1.5, 0]} />
                <ambientLight intensity={1.2} />
                <pointLight position={[10, 12, 10]} intensity={1.1} color="#e8e2d6" />
                <pointLight position={[-12, 8, -8]} intensity={0.55} color="#4a7c8c" />

                <Stars radius={42} depth={18} count={220} factor={3.5} saturation={0} fade speed={0.5} />

                {buildings.map((b) => (
                    <Skyscraper key={b.id} {...b} />
                ))}

                {SECTION_NODES.map((node) => {
                    const markerHeight = node.height - 1.5;
                    return (
                        <group key={node.id}>
                            <Skyscraper
                                position={node.position}
                                width={2.4}
                                height={node.height}
                                depth={2.4}
                                color={node.color}
                            />
                            <Html
                                position={[node.position[0], markerHeight + 0.55, node.position[2]]}
                                distanceFactor={14}
                                center
                                style={{ pointerEvents: 'auto' }}
                            >
                                <button
                                    type="button"
                                    className="marker-wrap relative border-0 bg-transparent p-0"
                                    onClick={() => onNodeClick?.(node.id)}
                                    aria-label={`Go to ${node.label}`}
                                >
                                    <span className="marker-label">{node.label}</span>
                                    <span className="marker-dot block" style={{ background: node.color }} />
                                </button>
                            </Html>
                        </group>
                    );
                })}

                <TransitLoop />
                <CameraRig />
            </Canvas>
        </div>
    );
}
