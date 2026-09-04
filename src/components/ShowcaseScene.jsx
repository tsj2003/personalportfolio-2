import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Desk({ isMobile }) {
    const group = useRef();
    const { scene } = useGLTF('/desktop_pc/scene.gltf');
    const cloned = useMemo(() => scene.clone(true), [scene]);

    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = -0.32 + Math.sin(t * 0.28) * 0.1 + state.pointer.x * 0.2;
        group.current.rotation.x = -0.04 + state.pointer.y * 0.06;
        group.current.position.y = (isMobile ? -1.05 : -1.2) + Math.sin(t * 0.7) * 0.04;
    });

    return (
        <group
            ref={group}
            scale={isMobile ? 0.5 : 0.66}
            position={[0.1, isMobile ? -1.05 : -1.2, 0]}
            rotation={[-0.02, -0.32, -0.04]}
        >
            <primitive object={cloned} />
        </group>
    );
}

export default function ShowcaseScene() {
    const [isMobile, setIsMobile] = useState(false);
    const [inView, setInView] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return undefined;
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin: '120px', threshold: 0.08 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div className="showcase-canvas" ref={wrapRef}>
            {inView ? (
                <Canvas
                    dpr={1}
                    camera={{ position: [0.35, 1.15, 7.6], fov: isMobile ? 42 : 33 }}
                    gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
                    onCreated={({ gl }) => {
                        gl.setClearColor('#f3f3f3');
                    }}
                >
                    <ambientLight intensity={0.75} />
                    <directionalLight position={[-4, 8, 4]} intensity={1.2} />
                    <pointLight position={[3, 2, 2]} intensity={0.7} color="#ff5c32" />
                    <Suspense fallback={null}>
                        <Desk isMobile={isMobile} />
                    </Suspense>
                </Canvas>
            ) : (
                <div className="showcase-canvas-placeholder" aria-hidden />
            )}
        </div>
    );
}
