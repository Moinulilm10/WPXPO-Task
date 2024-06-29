// src/components/NameList.js
const NameList = ({ names }) => {
  return (
    <div className="text-left top-[1em] text-xl text-slate-950 font-semibold border border-black rounded-lg m-5 p-3">
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;
