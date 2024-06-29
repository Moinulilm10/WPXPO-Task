import { useEffect, useRef, useState } from "react";
import "../styles/WheelSpinner.css";

const WheelSpinner = () => {
  const [names, setNames] = useState([
    "Aiden Harper",
    "Emma Reynolds",
    "Liam Bennett",
    "Sophia Caldwell",
    "Ethan Sawyer",
  ]);
  const [newName, setNewName] = useState("");
  const [selectedName, setSelectedName] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const canvasRef = useRef(null);
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawWheel(ctx);
  }, [names]);

  const addName = () => {
    if (newName.trim() !== "") {
      setNames([...names, newName.trim()]);
      setNewName("");
    }
  };

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
      setIsSpinning(true);
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
          setSelectedName(names[index]);
          setIsSpinning(false);
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
    <div className="text-center m-11">
      <div className="items-center text-xl">
        <h1 className="text-bold text-3xl">Spinner Wheel</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-1 justify-normal items-center">
          <div className="wheel-container">
            <canvas ref={canvasRef} width="400" height="400"></canvas>
            <div className="arrow"></div>
            <button
              className="rounded-md text-white min-w-[150px] bg-blue-950 m-5 p-3"
              onClick={spinWheel}
              disabled={isSpinning}
            >
              spin it
            </button>
          </div>
        </div>
        <div className="flex-1 justify-center items-center">
          <div className="place-items-start">
            <input
              type="text"
              className="border border-slate-800 p-2 m-2 focus:ring-blue-950 rounded-lg"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter a name"
            />
            <button
              className="rounded-lg bg-blue-950 text-white p-2 "
              onClick={addName}
            >
              Add Name
            </button>
          </div>
          <div className=" text-left top-[1em] text-xl text-slate-950 font-semibold border border-black rounded-lg m-5 p-3">
            <ul>
              {names.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        {selectedName && (
          <div className="selected-name align-middle text-center w-[250px] h-[70px] rounded-lg text-2xl text-white bg-blue-950  m-2 p-4">
            <h2>{selectedName} is Winner </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelSpinner;
