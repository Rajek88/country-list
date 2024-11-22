import { useEffect, useState } from "react";
import "./App.css";
import CountryCard from "./components/CountryCard";
import { API_BASE_URL, API_ROUTE_NAME } from "./config/ApiConfig";

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

  useEffect(() => {}, [countryList]);

  const fetchDetails = async () => {
    if (!country?.length) {
      return alert("Please enter country name!");
    }
    try {
      const res = await fetch(
        `${API_BASE_URL}/${API_ROUTE_NAME.NAME}/${country}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      setCountryList(data || []);
    } catch (error) {
      return alert(`oops! ${JSON.stringify(error)}`);
    }
  };

  return (
    <div className="page">
      <header>
        <div>Rest Countries</div>
      </header>

      <div className="search-input">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={fetchDetails}>Search</button>
      </div>

      <div className="result-container">
        <h1>Results ({countryList.length})</h1>
        <div className="country-list">
          {countryList.map((c, index) => {
            // here we are not doing erite, hence index is fine
            return <CountryCard details={c} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
