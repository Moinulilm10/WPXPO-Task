import { useEffect, useState } from "react";
import crossIcon from "../assets/cross-circle-svgrepo-com.svg";

const SelectedName = ({ selectedName }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (selectedName) {
      setVisible(true);
    }
  }, [selectedName]);

  if (!visible || !selectedName) return null;

  return (
    <div className="selected-name relative align-middle text-center w-[450px] h-[120px] rounded-lg text-2xl text-white bg-blue-950 m-2 p-10 mt-[-40px]">
      <h2>&quot;{selectedName}&quot; is Winner!</h2>
      <img
        src={crossIcon}
        alt="Close"
        className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
        onClick={() => setVisible(false)}
      />
    </div>
  );
};

export default SelectedName;
