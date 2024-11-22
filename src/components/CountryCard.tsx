import React, { useState } from "react";
import "./Countrycard.css";
import { Country } from "../App";

const CountryCard = ({ details }: { details: Country }) => {
  console.log({ details });
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="country-card">
      <img src={details?.flags?.svg} alt={details.flagAlt} />
      <div className="country-details">
        <h2>{details.name.official}</h2>
        <h4>{details.capital}</h4>
        <h4>{details.population}</h4>
      </div>
      <button onClick={() => setIsExpanded((v) => !v)} type="button">
        {isExpanded ? "^" : "v"}
      </button>
    </div>
  );
};

export default CountryCard;
