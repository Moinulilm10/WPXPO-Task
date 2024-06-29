// src/components/WheelSpinner.js
import React, { useState } from "react";
import "../styles/WheelSpinner.css";
import AddNameForm from "./AddNameForm";
import NameList from "./NameList";
import SelectedName from "./SelectedName";
import Wheel from "./Wheel";

const WheelSpinner2 = () => {
  const [names, setNames] = useState([
    "Aiden Harper",
    "Emma Reynolds",
    "Liam Bennett",
    "Sophia Caldwell",
    "Ethan Sawyer",
  ]);
  const [selectedName, setSelectedName] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
  ];

  const addName = (name) => {
    setNames([...names, name]);
  };

  const handleSpinEnd = (name) => {
    setSelectedName(name);
    setIsSpinning(false);
  };

  return (
    <div className="text-center m-11">
      <div className="items-center text-xl">
        <h1 className="text-bold text-3xl">Spinner Wheel</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-1 justify-normal items-center">
          <Wheel
            names={names}
            colors={colors}
            isSpinning={isSpinning}
            onSpinEnd={handleSpinEnd}
          />
        </div>
        <div className="flex-1 justify-center items-center">
          <AddNameForm addName={addName} />
          <NameList names={names} />
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <SelectedName selectedName={selectedName} />
      </div>
    </div>
  );
};

export default WheelSpinner2;
