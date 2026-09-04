import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    ContactShadows,
    Environment,
    Float,
    Html,
    Preload,
    Sparkles,
    Stars,
    useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';

function DeskComputer({ isMobile }) {
    const group = useRef();
    const { scene } = useGLTF('/desktop_pc/scene.gltf');

    const cloned = useMemo(() => {
        const next = scene.clone(true);
        next.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material = child.material.clone();
                    child.material.envMapIntensity = 1.15;
                    child.material.roughness = Math.min(child.material.roughness ?? 0.45, 0.55);
                    child.material.metalness = Math.max(child.material.metalness ?? 0.35, 0.25);
                }
            }
        });
        return next;
    }, [scene]);

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = -0.25 + Math.sin(t * 0.25) * 0.08;
        group.current.position.y = (isMobile ? -1.05 : -1.15) + Math.sin(t * 0.6) * 0.04;
    });

    return (
        <group
            ref={group}
            scale={isMobile ? 0.55 : 0.72}
            position={isMobile ? [0.1, -1.05, 0] : [0.35, -1.15, 0]}
            rotation={[-0.02, -0.35, -0.05]}
        >
            <primitive object={cloned} />
        </group>
    );
}

function OrbitEarth({ isMobile }) {
    const group = useRef();
    const { scene } = useGLTF('/planet/scene.gltf');

    const cloned = useMemo(() => scene.clone(true), [scene]);

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = t * 0.18;
        group.current.position.x = (isMobile ? 1.6 : 3.4) + Math.sin(t * 0.35) * 0.15;
        group.current.position.y = (isMobile ? 1.4 : 1.85) + Math.cos(t * 0.4) * 0.1;
    });

    return (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
            <group
                ref={group}
                scale={isMobile ? 0.55 : 0.85}
                position={isMobile ? [1.6, 1.4, -2.2] : [3.4, 1.85, -2.8]}
            >
                <primitive object={cloned} />
            </group>
        </Float>
    );
}

function CameraMotion({ scrollProgress, isMobile }) {
    const look = useRef(new THREE.Vector3(0, 0, 0));
    const target = useRef(new THREE.Vector3());

    useFrame((state, delta) => {
        const p = scrollProgress.current;
        const pointerX = state.pointer.x;
        const pointerY = state.pointer.y;
        const baseZ = isMobile ? 7.2 : 8.8;
        const baseY = isMobile ? 1.1 : 1.35;
        const baseX = isMobile ? 0.2 : 0.6;

        target.current.set(
            baseX + pointerX * (isMobile ? 0.45 : 0.9) - p * 0.8,
            baseY + pointerY * 0.35 + p * 0.55,
            baseZ - p * (isMobile ? 1.4 : 2.4)
        );

        state.camera.position.lerp(target.current, 1 - Math.exp(-3.2 * delta));
        look.current.lerp(
            new THREE.Vector3(pointerX * 0.3, 0.1 + p * 0.2, 0),
            1 - Math.exp(-2.5 * delta)
        );
        state.camera.lookAt(look.current);
    });

    return null;
}

function SceneContent({ scrollProgress, isMobile }) {
    return (
        <>
            <color attach="background" args={['#05070d']} />
            <fog attach="fog" args={['#05070d', 8, 28]} />

            <ambientLight intensity={0.35} />
            <hemisphereLight intensity={0.45} groundColor="#0a0c12" color="#d7e3ff" />
            <spotLight
                position={[-6, 10, 6]}
                angle={0.35}
                penumbra={0.7}
                intensity={2.2}
                castShadow
                shadow-mapSize={1024}
                color="#ffffff"
            />
            <pointLight position={[4, 3, 2]} intensity={1.4} color="#6ea8ff" />
            <pointLight position={[-3, 1.5, 3]} intensity={0.8} color="#0d11ff" />

            <Stars radius={60} depth={40} count={1200} factor={3} saturation={0} fade speed={0.6} />
            <Sparkles count={55} scale={[12, 6, 8]} size={2.5} speed={0.35} color="#8fbfff" opacity={0.55} />

            <DeskComputer isMobile={isMobile} />
            <OrbitEarth isMobile={isMobile} />

            <ContactShadows
                position={[0, -1.55, 0]}
                opacity={0.55}
                scale={18}
                blur={2.6}
                far={5}
                color="#000000"
            />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.56, 0]} receiveShadow>
                <circleGeometry args={[8, 64]} />
                <meshStandardMaterial color="#0a0e16" metalness={0.7} roughness={0.35} />
            </mesh>

            <Environment preset="city" />
            <CameraMotion scrollProgress={scrollProgress} isMobile={isMobile} />
        </>
    );
}

export default function RealisticScene3D({ scrollProgress }) {
    const [isMobile, setIsMobile] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return (
        <div className="scene-3d">
            <Canvas
                shadows
                dpr={[1, 1.75]}
                camera={{ position: [0.6, 1.35, 8.8], fov: isMobile ? 42 : 36, near: 0.1, far: 100 }}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                onCreated={() => setReady(true)}
            >
                <Suspense
                    fallback={
                        <Html center>
                            <div className="scene-loader">
                                <div className="scene-loader-ring" />
                                <p>Loading 3D scene…</p>
                            </div>
                        </Html>
                    }
                >
                    <SceneContent scrollProgress={scrollProgress} isMobile={isMobile} />
                    <Preload all />
                </Suspense>
            </Canvas>
            {!ready && (
                <div className="scene-boot">
                    <div className="scene-loader-ring" />
                    <p>Booting realistic scene</p>
                </div>
            )}
        </div>
    );
}

useGLTF.preload('/desktop_pc/scene.gltf');
useGLTF.preload('/planet/scene.gltf');
