import React, { useState } from "react";
import "./DateFilter.css";

function DateFilter({ onFilter }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (onFilter) {
      onFilter({ startDate, endDate });
    }
  };

  return (
    <div className="date-filter">
      <div className="field">
        <label> Fecha inicio:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
      </div>
      <div className="field">

        <label>
          Fecha fin:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleFilter}>Aplicar filtro</button>
    </div>
  );
}

export default DateFilter;
