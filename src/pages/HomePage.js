import React, { useState} from 'react';
import ResultsPage from './ResultsPage';



const Input = ({ type, placeholder, value, onChange, style }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange} 
      style={style}
    />
  );
};


function Homepage() {
  const [address, setAddress] = useState('');
  const [route, setRoute] = useState('home');
  const [resultsData, setResultsData] = useState();

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    console.log("Address input:", event.target.value);
  };

  // Convert address/ZIP into latitude and longitude using OpenCage
  const getCoordinates = async (input) => {
    const geoKey = process.env.REACT_APP_GEO_CODING_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(input)}&key=${geoKey}&countrycode=us`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  
      const data = await response.json();
  
      if (!data.results || data.results.length === 0) {
        throw new Error("Location not found");
      }
  
      const firstResult = data.results[0]; // <-- declare a variable here
  
      return {
        lat: firstResult.geometry.lat,
        lon: firstResult.geometry.lng,
        state: firstResult.components.state,
        municipality: firstResult.components.city ||
                      firstResult.components.town ||
                      firstResult.components.village,
        postcode: firstResult.components.postcode,
      };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Couldn't find that location. Please try again.");
      return null;
    }
  };
  
  const handleSearch = async () => {
    const apiKey = process.env.REACT_APP_STATE_API_KEY;
  
    try {
      const coords = await getCoordinates(address);
      if (!coords) return;
  
      const { lat, lon, state, municipality } = coords;
  
      console.log("Latitude:", lat, "Longitude:", lon, "State:", state, "Municipality:", municipality);
  
      // --- Legislators (state + federal) ---
      const geoResponse = await fetch(
        `https://v3.openstates.org/people.geo?lat=${lat}&lng=${lon}`,
        { headers: { "X-API-KEY": apiKey } }
      );
  
      if (!geoResponse.ok)
        throw new Error(`Error: ${geoResponse.status} - ${geoResponse.statusText}`);
  
      const geoData = await geoResponse.json();
      console.log("Legislators from people.geo:", geoData.results);
  
      // --- Governor ---
      const govResponse = await fetch(
        `https://v3.openstates.org/people?jurisdiction=${encodeURIComponent(state)}&org_classification=executive&per_page=50`,
        { headers: { "X-API-KEY": apiKey } }
      );
  
      if (!govResponse.ok)
        throw new Error(`Error fetching governor: ${govResponse.status}`);
  
      const govData = await govResponse.json();
      console.log("Governor:", govData.results);
  
      // --- Mayor ---
      let mayor = null;
      if (municipality) {
        const mayorResponse = await fetch(
          `https://v3.openstates.org/people?jurisdiction=${encodeURIComponent(municipality)}&org_classification=executive&per_page=50`,
          { headers: { "X-API-KEY": apiKey } }
        );
  
        if (!mayorResponse.ok)
          throw new Error(`Error fetching mayor: ${mayorResponse.status}`);
  
        const mayorData = await mayorResponse.json();
        mayor = mayorData.results[0];
        console.log("Mayor:", mayor);
      }
  
      // Combine everything for display
      const allResults = [
        ...(geoData.results || []),
        ...(govData.results || []),
      ].filter(Boolean);
  
      setResultsData(allResults);
      setRoute("results");
  
    } catch (error) {
      console.error("Search failed:", error);
      alert("Search failed. Please check your ZIP code or address.");
    }
  };
  

  

    let page = (<>
    <div
    style={{
        
            backgroundImage: 'linear-gradient(to right, #f49494, #ededed, #95baff)',
            padding: '50px',
            minHeight: '50vh', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '20px',
            
          }} className="homepage-container"
    >      
      <h1
        style={{ 
          fontSize: '3rem', 
          marginBottom: '20px', 
          color: '#545454' 
        }}
        >
        Find Your Representatives</h1>

    <div
      style={{
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px', 
    }}
    >  
    <Input
      type="text"
      placeholder="Enter your full address"
      value = {address}
      onChange={handleAddressChange}
      style={{
        width: '400px',
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '20px',
        border: '3px solid #ccc',
        borderColor: '#545454'
        }}
      />
      <button
        onClick ={() => handleSearch()}
        style={{
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#545454',
        color: '#fff',
        cursor: 'pointer',
  }}
  >
  Search
  </button>

    </div>
  </div>
    </>);
    if(route === 'results'){
      page = <ResultsPage resultsData={resultsData} />;
    }

  return ( <div>
    {page}
  </div>
  
  );
};


export default Homepage;
