import React, {useState} from "react";
import axios from "axios";

const Input = () => {
    const [zipCode, setZipCode] = useState("");
    const [zipCode2, setZipCode2] = useState("");
    const [distance, setDistance] = useState("");
    const [unit, setUnit] = useState("");

    async function getDistance() {
      try { const distance = await axios.get(`https://zip-api.eu/api/v1/distance/US-${zipCode}/US-${zipCode2}/${unit}`);
      setDistance(distance.data.distance);
      if (unit=="") {setUnit("km")}
      } catch(error) {
          console.error(error);
      };
    }

    const handleInputChange = (event, setState) => {
      setState(event.target.value);
    };

    const selectValue = (event) => {
      setUnit(event.target.value);
      setDistance("");
    };
    
    return (
      <div>
        <input
          value={zipCode}
          onChange={(event) => handleInputChange(event, setZipCode)}
        />
        <input
          value={zipCode2}
          onChange={(event) => handleInputChange(event, setZipCode2)}
        />
        <select value={unit} onChange={selectValue}>
          <option value="km">km</option>
          <option value="mi">mi</option>
        </select>

        <button onClick={getDistance}>Compute Distance</button>
        {distance && (
          <p key={distance.url}>
            {distance} {unit}
          </p>
        )}
      </div>
    );
};

export default Input;