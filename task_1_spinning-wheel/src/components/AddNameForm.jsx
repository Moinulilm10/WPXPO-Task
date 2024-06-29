// src/components/AddNameForm.js
import { useState } from "react";

const AddNameForm = ({ addName }) => {
  const [newName, setNewName] = useState("");

  const handleAddName = () => {
    if (newName.trim() !== "") {
      addName(newName.trim());
      setNewName("");
    }
  };

  return (
    <div className="place-items-start">
      <input
        type="text"
        className="border border-slate-800 p-2 m-2 focus:ring-blue-950 rounded-lg"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter a name"
      />
      <button
        className="rounded-lg bg-blue-950 text-white p-2"
        onClick={handleAddName}
      >
        Add Name
      </button>
    </div>
  );
};

export default AddNameForm;
