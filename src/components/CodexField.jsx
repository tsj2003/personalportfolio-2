import { useEffect, useRef } from 'react';

/**
 * Global dark Codex field: white dots across the viewport.
 * Hover ripples dots into bright 0 / 1. Fixed behind all UI.
 */
export default function CodexField({
    className = '',
    label = 'TSJ CODEX',
    mode = 'global', // 'global' | 'section'
}) {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;

        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        const mouse = { x: -9999, y: -9999, active: false };
        let dots = [];
        let raf = 0;
        let w = 0;
        let h = 0;
        let visible = true;
        let running = false;
        let settle = 0;
        let t0 = performance.now();
        let frame = 0;

        const rand = (a, b) => a + Math.random() * (b - a);

        const rebuild = () => {
            const rect = wrap.getBoundingClientRect();
            w = Math.max(1, Math.floor(rect.width || window.innerWidth));
            h = Math.max(1, Math.floor(rect.height || window.innerHeight));
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const gap = mode === 'global' ? 22 : 16;
            const cols = Math.ceil(w / gap) + 1;
            const rows = Math.ceil(h / gap) + 1;
            dots = [];

            for (let row = 0; row < rows; row += 1) {
                for (let col = 0; col < cols; col += 1) {
                    // slight jitter so it feels organic, not a rigid grid
                    const ox = col * gap + rand(-2.5, 2.5);
                    const oy = row * gap + rand(-2.5, 2.5);
                    // skip some for air
                    if ((row + col) % 7 === 0) continue;
                    dots.push({
                        ox,
                        oy,
                        x: ox,
                        y: oy,
                        r: rand(1.1, 1.85),
                        phase: rand(0, Math.PI * 2),
                        binary: (row + col) % 2 === 0 ? '1' : '0',
                        alpha: rand(0.22, 0.42),
                    });
                }
            }
            if (dots.length > 900) dots = dots.filter((_, i) => i % 2 === 0 || i % 3 !== 0).slice(0, 900);
            drawFrame(0, true);
        };

        const drawFrame = (t, force) => {
            if (!visible && !force) return false;
            ctx.clearRect(0, 0, w, h);

            // deep space wash
            const g = ctx.createRadialGradient(w * 0.5, h * 0.2, 40, w * 0.5, h * 0.5, Math.max(w, h) * 0.85);
            g.addColorStop(0, 'rgba(28, 30, 48, 0.55)');
            g.addColorStop(0.55, 'rgba(8, 9, 16, 0.35)');
            g.addColorStop(1, 'rgba(4, 5, 10, 0.15)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            const mx = mouse.x;
            const my = mouse.y;
            const active = mouse.active;
            let moving = false;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let i = 0; i < dots.length; i += 1) {
                const d = dots[i];
                const dx = mx - d.ox;
                const dy = my - d.oy;
                const distSq = dx * dx + dy * dy;
                const radius = 120;
                const influence =
                    active && distSq < radius * radius ? 1 - Math.sqrt(distSq) / radius : 0;

                const breath = Math.sin(t * 0.8 + d.phase) * 0.9;
                let tx = d.ox + breath;
                let ty = d.oy + Math.cos(t * 0.65 + d.phase) * 0.7;

                if (influence > 0) {
                    const dist = Math.sqrt(distSq) || 1;
                    const push = influence * influence * 18;
                    tx -= (dx / dist) * push;
                    ty -= (dy / dist) * push;
                }

                const nx = d.x + (tx - d.x) * 0.22;
                const ny = d.y + (ty - d.y) * 0.22;
                if (Math.abs(nx - d.x) > 0.03 || Math.abs(ny - d.y) > 0.03) moving = true;
                d.x = nx;
                d.y = ny;

                const showBinary = influence > 0.22;
                if (showBinary) {
                    ctx.font = `600 ${11 + influence * 5}px "IBM Plex Mono", ui-monospace, monospace`;
                    ctx.fillStyle = `rgba(255,255,255,${0.55 + influence * 0.45})`;
                    ctx.fillText(d.binary, d.x, d.y);
                } else {
                    const a = d.alpha + Math.sin(t * 1.1 + d.phase) * 0.06;
                    ctx.beginPath();
                    ctx.arc(d.x, d.y, d.r + influence * 1.4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255,255,255,${Math.min(0.85, a + influence * 0.4)})`;
                    ctx.fill();
                }
            }

            return moving || active;
        };

        const loop = (now) => {
            if (!running) return;
            frame += 1;
            const interacting = mouse.active || settle > 6;
            if (interacting || frame % 2 === 0) {
                const t = (now - t0) / 1000;
                const needsMore = drawFrame(t, false);
                if (needsMore) settle = 20;
                else if (settle > 0) settle -= 1;
            }
            if (visible) raf = requestAnimationFrame(loop);
            else {
                running = false;
                raf = 0;
            }
        };

        const kick = () => {
            if (!visible) return;
            settle = Math.max(settle, 24);
            if (!running) {
                running = true;
                raf = requestAnimationFrame(loop);
            }
        };

        const onMove = (e) => {
            if (mode === 'global') {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            } else {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            }
            mouse.active = true;
            kick();
        };
        const onLeave = () => {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
            kick();
        };

        rebuild();

        let resizeTimer = 0;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(rebuild, 100);
        };
        window.addEventListener('resize', onResize);

        const io = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                if (visible) kick();
                else {
                    running = false;
                    cancelAnimationFrame(raf);
                    raf = 0;
                }
            },
            { threshold: 0 }
        );
        io.observe(wrap);

        // listen on window for global mode so overlays don't block
        const moveTarget = mode === 'global' ? window : wrap;
        moveTarget.addEventListener('pointermove', onMove, { passive: true });
        if (mode !== 'global') {
            wrap.addEventListener('pointerleave', onLeave);
        } else {
            window.addEventListener('pointerleave', onLeave);
        }

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', onResize);
            io.disconnect();
            moveTarget.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerleave', onLeave);
            wrap.removeEventListener('pointerleave', onLeave);
        };
    }, [mode]);

    return (
        <div
            ref={wrapRef}
            className={`codex-field ${mode === 'global' ? 'codex-field-global' : ''} ${className}`.trim()}
            aria-hidden={mode === 'global' ? true : undefined}
        >
            <canvas ref={canvasRef} aria-label={label} />
        </div>
    );
}
