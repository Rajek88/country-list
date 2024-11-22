import { useState } from "react";
import "./Countrycard.css";
import { Country } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faMapPin,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const CountryCard = ({ details }: { details: Country }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="country-card">
      <div className="base">
        <img src={details?.flags?.svg} alt={details.flagAlt} />
        <div className="country-details">
          <h2>{details.name.official}</h2>
          <h4 title="capital">
            <FontAwesomeIcon icon={faMapPin} /> &nbsp;
            {details.capital}
          </h4>
          <h4 title="Population">
            <FontAwesomeIcon icon={faPeopleGroup} /> &nbsp;
            {details.population}
          </h4>
        </div>
        <button
          className="dropdown-button"
          onClick={() => setIsExpanded((v) => !v)}
          type="button"
        >
          {isExpanded ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="expanded">
          <iframe
            width="100%"
            height="500"
            src={`https://maps.google.com/maps?q=${details?.latlng[0]},${details?.latlng[1]}&hl=es&z=1&amp;output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default CountryCard;
