import { useCallback, useEffect, useRef } from "react";

export const useSounds = () => {
  const audioContextRef = useRef(null);
  const pressBufferRef = useRef(null);
  const releaseBufferRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const response = await fetch('/assets/keycap-sounds/press.mp3');
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
        pressBufferRef.current = decodedBuffer;

        const releaseResponse = await fetch('/assets/keycap-sounds/release.mp3');
        const releaseArrayBuffer = await releaseResponse.arrayBuffer();
        const releaseDecodedBuffer = await ctx.decodeAudioData(releaseArrayBuffer);
        releaseBufferRef.current = releaseDecodedBuffer;
      } catch (error) {
        console.error("Failed to load keycap sound effects", error);
      }
    };

    loadSound();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const getContext = useCallback(() => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
    return audioContextRef.current;
  }, []);

  const playSoundBuffer = useCallback((buffer, baseDetune = 0) => {
    try {
      const ctx = getContext();
      if (!ctx || !buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Add pitch detune variation (+-100 cents) for organic clicking sounds
      source.detune.value = baseDetune + (Math.random() * 200) - 100;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.35;

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(0);
    } catch (err) {
      console.error("Sound play error:", err);
    }
  }, [getContext]);

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef.current);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef.current);
  }, [playSoundBuffer]);

  return {
    playPressSound,
    playReleaseSound,
  };
};
