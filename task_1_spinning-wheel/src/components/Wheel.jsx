// src/components/Wheel.js
import { useEffect, useRef } from "react";

const Wheel = ({ names, colors, isSpinning, onSpinEnd }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawWheel(ctx);
  }, [names]);

  const drawWheel = (ctx) => {
    const arcSize = (2 * Math.PI) / names.length;
    const radius = canvasRef.current.width / 2;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    names.forEach((name, index) => {
      ctx.beginPath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, index * arcSize, (index + 1) * arcSize);
      ctx.lineTo(radius, radius);
      ctx.fill();
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate((index + 0.5) * arcSize);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(name, radius - 10, 10);
      ctx.restore();
    });
  };

  const spinWheel = () => {
    if (names.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let angle = 0;
      let spinAngleStart = Math.random() * 10 + 10;
      let spinTime = 0;
      const spinTimeTotal = Math.random() * 3 + 4 * 1000;

      const rotateWheel = () => {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
          const degrees = (angle * 180) / Math.PI + 90;
          const arcd = (2 * Math.PI) / names.length;
          const index = Math.floor(
            (360 - (degrees % 360)) / (360 / names.length)
          );
          onSpinEnd(names[index]);
          return;
        }
        const spinAngle =
          spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        angle += (spinAngle * Math.PI) / 180;
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        drawWheel(ctx);
        ctx.restore();
        requestAnimationFrame(rotateWheel);
      };

      rotateWheel();
    }
  };

  const easeOut = (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  };

  return (
    <div className="wheel-container">
      <canvas ref={canvasRef} width="400" height="400"></canvas>
      <div className="arrow"></div>
      <button
        className="rounded-md text-white min-w-[150px] bg-blue-950 m-5 p-3"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        Spin it
      </button>
    </div>
  );
};

export default Wheel;
