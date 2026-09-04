import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <span className="canvas-load h-10 w-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <p
          style={{
            fontSize: 14,
            color: "#f1f1f1",
            fontWeight: 800,
            marginTop: 12,
          }}
        >
          {progress.toFixed(2)}%
        </p>
      </div>
    </Html>
  );
};

export default Loader;
