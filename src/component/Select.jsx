import React from "react";
const Select = ({ value, id, data, onChange }) => {
  return (
    <select value={value} className="custom-select" id={id} onChange={onChange}>
      <option></option>
      {data.map((g) => {
        return (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
