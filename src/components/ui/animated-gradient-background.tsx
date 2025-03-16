import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
  className?: string;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Colors for the gradient
    const colors = [
      { r: 59, g: 130, b: 246 }, // blue-500
      { r: 99, g: 102, b: 241 }, // indigo-500
      { r: 139, g: 92, b: 246 }, // purple-500
      { r: 79, g: 70, b: 229 }, // indigo-600
    ];

    // Gradient points
    const points = [];
    const pointCount = 5;

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[i % colors.length],
      });
    }

    const animate = () => {
      // Clear canvas with a very subtle background
      ctx.fillStyle = "rgba(249, 250, 251, 0.01)";
      ctx.fillRect(0, 0, width, height);

      // Move points
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
      });

      // Create gradient
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5,
      );

      // Add color stops based on points
      points.forEach((point, i) => {
        const { r, g, b } = point.color;
        const offset = i / (points.length - 1);
        gradient.addColorStop(offset, `rgba(${r}, ${g}, ${b}, 0.05)`);
      });

      // Draw gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default AnimatedGradientBackground;
