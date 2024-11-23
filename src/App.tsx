import { useEffect, useState } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";
import { API_BASE_URL, API_ROUTE_NAME } from "./config/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import EarthImg from "./assets/world.png";
import { debounce } from "./performance/Debounce";

export interface Country {
  capital: string[];
  name: { official: string };
  population: number;
  flags: {
    svg: string;
  };
  flagAlt?: string;
  latlng: [string, string];
}

function App() {
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState("");
  const [update, setUpdate] = useState(0);

  const handleInputChange = (input: string) => {
    setCountry(input);
    debounce(() => fetchDetails(input))();
  };

  useEffect(() => {}, [countryList]);

  const fetchDetails = async (input: string | null = null) => {
    console.log("calling api");
    setUpdate((v) => v + 1);
    let countryName = input?.trim() || country;
    if (!countryName?.trim()?.length || Number(countryName)) {
      return setEror("Please enter a valid country name");
    }
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/${API_ROUTE_NAME.NAME}/${countryName}`
      );
      if (!res.ok) {
        return setEror("No country found with this name");
      }
      const data = await res.json();
      setCountryList(data || []);
      setLoading(false);
      setEror("");
    } catch (error) {
      setLoading(false);
      setEror("The API returned error, Please try again");
    }
  };

  return (
    <div className={update === 0 ? "page centered" : "page"}>
      <header>
        <h1>HeyCountry 👋</h1>
      </header>

      <div className="search-input">
        <input
          type="text"
          value={country}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter country name"
        />
        <button onClick={() => fetchDetails()} disabled={loading}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {error?.length > 0 && (
        <span className="error">---------- {error} ----------</span>
      )}

      {update !== 0 &&
        (loading ? (
          <div className="loading">
            <img className="earth-logo" src={EarthImg} alt="earth" />
            <span>Roaming the earth for you..</span>
            <a
              className="attribution"
              href="https://www.flaticon.com/free-icons/planet-earth"
              title="planet earth icons"
            >
              Planet earth icons created by Freepik - Flaticon
            </a>
          </div>
        ) : (
          <div className="result-container">
            <h1>
              {countryList.length
                ? `Results (${countryList.length})`
                : "Search a country name!"}
            </h1>
            <div className="country-list">
              {countryList.map((c, index) => {
                // here we are not doing erite, hence index is fine
                return <CountryCard details={c} key={index} />;
              })}
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
