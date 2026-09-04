import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = ({ scrollProgress = 0, theme = 'cyber' }) => {
    const containerRef = useRef(null);
    const scrollProgressRef = useRef(scrollProgress);

    // Keep scroll progress updated in a ref to avoid recreating the scene
    useEffect(() => {
        scrollProgressRef.current = scrollProgress;
    }, [scrollProgress]);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene setup
        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 160;
        camera.position.y = 75;
        camera.lookAt(0, -10, 0);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle Grid
        const numParticles = 3600; // 60x60 grid
        const separation = 8;
        const countX = 60;
        const countY = 60;

        const positions = new Float32Array(numParticles * 3);
        const colors = new Float32Array(numParticles * 3);

        // Theme colors
        const colorCyan = new THREE.Color('#00f3ff');
        const colorPink = new THREE.Color('#ff007f');
        const colorObsidianBlue = new THREE.Color('#3b82f6');
        const colorObsidianPurple = new THREE.Color('#8b5cf6');
        const colorStitchTeal = new THREE.Color('#0f766e');
        const colorStitchRust = new THREE.Color('#c2410c');

        let idx = 0;
        for (let ix = 0; ix < countX; ix++) {
            for (let iy = 0; iy < countY; iy++) {
                const x = ix * separation - (countX * separation) / 2;
                const z = iy * separation - (countY * separation) / 2;
                
                positions[idx * 3] = x;
                positions[idx * 3 + 1] = 0;
                positions[idx * 3 + 2] = z;

                // Default cyan-to-pink gradient
                const mixedColor = colorCyan.clone().lerp(colorPink, ix / countX);
                colors[idx * 3] = mixedColor.r;
                colors[idx * 3 + 1] = mixedColor.g;
                colors[idx * 3 + 2] = mixedColor.b;

                idx++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create smooth circle particle texture
        const createCircleTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 16, 16);
            return new THREE.CanvasTexture(canvas);
        };

        const material = new THREE.PointsMaterial({
            size: 1.6,
            vertexColors: true,
            transparent: true,
            opacity: 0.55,
            map: createCircleTexture(),
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Design Grid Helper (shows alignment coordinate space)
        const gridHelper = new THREE.GridHelper(600, 60, 0xffffff, 0xffffff);
        gridHelper.position.y = -22;
        gridHelper.material.opacity = 0.04;
        gridHelper.material.transparent = true;
        scene.add(gridHelper);

        // Mouse interactions
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        const handleMouseMove = (event) => {
            targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        let frameId;
        let time = 0;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            time += 0.012;

            // Interpolate mouse coordinates smoothly
            mouseX += (targetMouseX - mouseX) * 0.04;
            mouseY += (targetMouseY - mouseY) * 0.04;

            // Select color endpoints based on active theme
            let activeColor1 = colorCyan;
            let activeColor2 = colorPink;

            if (theme === 'obsidian') {
                activeColor1 = colorObsidianBlue;
                activeColor2 = colorObsidianPurple;
            } else if (theme === 'stitch') {
                activeColor1 = colorStitchTeal;
                activeColor2 = colorStitchRust;
            }

            const posAttr = particles.geometry.attributes.position;
            const colorsAttr = particles.geometry.attributes.color;

            let index = 0;
            for (let ix = 0; ix < countX; ix++) {
                for (let iy = 0; iy < countY; iy++) {
                    const x = posAttr.getX(index);
                    const z = posAttr.getZ(index);

                    // Wave function + mouse interactive displacement
                    const baseWave1 = Math.sin(x * 0.038 + time) * 6;
                    const baseWave2 = Math.cos(z * 0.038 + time) * 6;
                    
                    const distToMouse = Math.sqrt((x / 10 - mouseX * 24) ** 2 + (z / 10 - mouseY * 24) ** 2);
                    const mouseRipple = Math.max(0, 12 - distToMouse) * 1.8;

                    posAttr.setY(index, baseWave1 + baseWave2 + mouseRipple);

                    // Color based on height mix ratio
                    const mixRatio = Math.max(0, Math.min(1, (posAttr.getY(index) + 10) / 20));
                    const mixed = activeColor1.clone().lerp(activeColor2, mixRatio);
                    colorsAttr.setXYZ(index, mixed.r, mixed.g, mixed.b);

                    index++;
                }
            }

            posAttr.needsUpdate = true;
            colorsAttr.needsUpdate = true;

            // Move camera based on scroll progress
            const scroll = scrollProgressRef.current;
            camera.position.x = Math.sin(scroll * Math.PI * 0.55) * 55 + mouseX * 20;
            camera.position.z = 160 - scroll * 45;
            camera.position.y = 75 - scroll * 30 + mouseY * 12;
            camera.lookAt(0, -10 + scroll * 8, 0);

            particles.rotation.y = time * 0.02;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, [theme]);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default ThreeCanvas;
