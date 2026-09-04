import { useEffect, useRef } from 'react';

/**
 * Lightweight Codex glyph field.
 * Cached CSS/canvas background, capped glyphs, no shadows, pauses offscreen.
 */
export default function CodexField({ className = '', label = 'TSJ CODEX' }) {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;

        const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
        const mouse = { x: -9999, y: -9999, active: false };
        let glyphs = [];
        let raf = 0;
        let w = 0;
        let h = 0;
        let visible = true;
        let running = false;
        let settle = 0;
        let bgCanvas = null;

        const rand = (a, b) => a + Math.random() * (b - a);

        const paintBackground = () => {
            if (!bgCanvas) bgCanvas = document.createElement('canvas');
            bgCanvas.width = w;
            bgCanvas.height = h;
            const bctx = bgCanvas.getContext('2d');
            const g = bctx.createRadialGradient(
                w * 0.28,
                h * 0.18,
                20,
                w * 0.45,
                h * 0.45,
                Math.max(w, h) * 0.85
            );
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.25, '#f3ecff');
            g.addColorStop(0.55, '#d5c8f5');
            g.addColorStop(0.85, '#b9b6ef');
            g.addColorStop(1, '#9ea8e8');
            bctx.fillStyle = g;
            bctx.fillRect(0, 0, w, h);
        };

        const rebuild = () => {
            const rect = wrap.getBoundingClientRect();
            w = Math.max(1, Math.floor(rect.width));
            h = Math.max(1, Math.floor(rect.height));
            canvas.width = w;
            canvas.height = h;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            paintBackground();

            const cx = w * 0.42;
            const cy = h * 0.42;
            const rx = Math.min(w, h) * 0.32;
            const ry = Math.min(w, h) * 0.24;
            // Keep count low — ~160 max
            const cols = Math.min(28, Math.floor((rx * 2) / 14));
            const rows = Math.min(20, Math.floor((ry * 2) / 16));
            glyphs = [];

            for (let row = 0; row < rows; row += 1) {
                for (let col = 0; col < cols; col += 1) {
                    const u = cols <= 1 ? 0 : (col / (cols - 1)) * 2 - 1;
                    const v = rows <= 1 ? 0 : (row / (rows - 1)) * 2 - 1;
                    const d = Math.sqrt(u * u + v * v);
                    const edge = 0.7 + Math.sin(row * 1.7 + col * 0.9) * 0.1;
                    if (d > edge) continue;
                    if ((row + col) % 2 === 0 && d > 0.35) continue;

                    let base = '-';
                    if (d < 0.22) base = 'o';
                    else if (d < 0.48) base = '>';

                    const ox = cx + u * rx + rand(-1.5, 1.5);
                    const oy = cy + v * ry + rand(-1.5, 1.5);
                    glyphs.push({
                        ox,
                        oy,
                        x: ox,
                        y: oy,
                        base,
                        binary: (row + col) % 2 === 0 ? '1' : '0',
                        phase: rand(0, Math.PI * 2),
                    });
                }
            }

            // hard cap
            if (glyphs.length > 180) glyphs = glyphs.slice(0, 180);
            drawFrame(0, true);
        };

        const drawFrame = (_t, force) => {
            if (!visible && !force) return;
            ctx.drawImage(bgCanvas, 0, 0);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '500 12px ui-monospace, SFMono-Regular, Menlo, monospace';

            const mx = mouse.x;
            const my = mouse.y;
            const active = mouse.active;
            let moving = false;

            for (let i = 0; i < glyphs.length; i += 1) {
                const g = glyphs[i];
                const dx = mx - g.ox;
                const dy = my - g.oy;
                const distSq = dx * dx + dy * dy;
                const radius = 90;
                const influence = active && distSq < radius * radius ? 1 - Math.sqrt(distSq) / radius : 0;

                // no continuous idle drift — only react to cursor
                let tx = g.ox;
                let ty = g.oy;

                if (influence > 0) {
                    const dist = Math.sqrt(distSq) || 1;
                    const forceAmt = influence * influence * 22;
                    tx -= (dx / dist) * forceAmt;
                    ty -= (dy / dist) * forceAmt;
                }

                const nx = g.x + (tx - g.x) * 0.22;
                const ny = g.y + (ty - g.y) * 0.22;
                if (Math.abs(nx - g.x) > 0.05 || Math.abs(ny - g.y) > 0.05) moving = true;
                g.x = nx;
                g.y = ny;

                const showBinary = influence > 0.2;
                ctx.fillStyle = showBinary ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.62)';
                ctx.fillText(showBinary ? g.binary : g.base, g.x, g.y);
            }

            return moving || active;
        };

        const loop = () => {
            if (!running) return;
            const needsMore = drawFrame(0, false);
            if (needsMore) {
                settle = 18;
            } else if (settle > 0) {
                settle -= 1;
            }
            if (settle > 0 || mouse.active) {
                raf = requestAnimationFrame(loop);
            } else {
                running = false;
                raf = 0;
            }
        };

        const kick = () => {
            if (!visible) return;
            settle = Math.max(settle, 20);
            if (!running) {
                running = true;
                raf = requestAnimationFrame(loop);
            }
        };

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
            kick();
        };
        const onLeave = () => {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
            kick();
        };
        const onTouch = (e) => {
            const touch = e.touches[0];
            if (!touch) return;
            const rect = canvas.getBoundingClientRect();
            mouse.x = touch.clientX - rect.left;
            mouse.y = touch.clientY - rect.top;
            mouse.active = true;
            kick();
        };

        rebuild();

        let resizeTimer = 0;
        const ro = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(rebuild, 120);
        });
        ro.observe(wrap);

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
            { rootMargin: '80px', threshold: 0.05 }
        );
        io.observe(wrap);

        canvas.addEventListener('pointermove', onMove, { passive: true });
        canvas.addEventListener('pointerleave', onLeave);
        canvas.addEventListener('pointerdown', onMove, { passive: true });
        canvas.addEventListener('touchmove', onTouch, { passive: true });
        canvas.addEventListener('touchend', onLeave);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(resizeTimer);
            ro.disconnect();
            io.disconnect();
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerleave', onLeave);
            canvas.removeEventListener('pointerdown', onMove);
            canvas.removeEventListener('touchmove', onTouch);
            canvas.removeEventListener('touchend', onLeave);
        };
    }, []);

    return (
        <div ref={wrapRef} className={`codex-field ${className}`.trim()}>
            <canvas ref={canvasRef} aria-label={label} />
            <div className="codex-caption">
                <span>Move over the codex</span>
                <span>glyphs become 0 / 1</span>
            </div>
        </div>
    );
}
