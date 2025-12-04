import React, { useState} from 'react';
import ResultsPage from './ResultsPage';
import mayorData from "../data/mayors.json";




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

  // Converts address/zipcode into latitude and longitude using OpenCage
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
  
      const firstResult = data.results[0]; 
  
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
  
      
      const geoResponse = await fetch(
        `https://v3.openstates.org/people.geo?lat=${lat}&lng=${lon}`,
        { headers: { "X-API-KEY": apiKey } }
      );
  
      if (!geoResponse.ok)
        throw new Error(`Error: ${geoResponse.status} - ${geoResponse.statusText}`);
  
      const geoData = await geoResponse.json();
      console.log("Legislators from people.geo:", geoData.results);
  
   
      const govResponse = await fetch(
        `https://v3.openstates.org/people?jurisdiction=${encodeURIComponent(state)}&org_classification=executive&per_page=50`,
        { headers: { "X-API-KEY": apiKey } }
      );
  
      if (!govResponse.ok)
        throw new Error(`Error fetching governor: ${govResponse.status}`);
  
      const govData = await govResponse.json();
      console.log("Governor:", govData.results);
  
      
      const normalizedMunicipality = municipality.trim().toLowerCase();

      
      const localMayor = mayorData.find(entry =>
        entry.Municipality.trim().toLowerCase() === normalizedMunicipality
      );
      
      console.log("Local mayor match:", localMayor);
      
     
      const allResults = [
        ...(geoData.results || []),
        ...(govData.results || []),
      
        localMayor && String(localMayor["Term ends"]) !== "2025" ? {
          id: `mayor-${localMayor.Municipality}`,
          name: localMayor.Mayor,
          party: localMayor.Party || "",
          image: require('../UI/PfpPlaceHolder.png'),
          jurisdiction: { classification: "municipality" },
          current_role: { title: `Mayor of ${localMayor.Municipality}` },
          email: localMayor.Email || null,
          offices: [
            { 
              address: localMayor.Address || "",
              voice: localMayor.Phone || null
            }
          ]
        } : null
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
      placeholder="Enter your zipcode or full address"
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

  <div
    style={{
      display: 'flex',
      justifyContent: 'center', 
      gap: '40px', 
      padding: '40px 0', 
      margin: '0 auto', 
     
    }}
  >
   
    <div
      style={{
        width: '700px',
        height: '400px',
        backgroundColor: '#ededed', 
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column', 
        alignItems: 'center',
        color: '#545454',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        borderLeft: '60px solid #f49494',
      }}
    >
      
      <h1 style={{ 
        fontSize: '2rem',
        textAlign: 'center',
        padding: '20px',

      }}>
        In 2024 of our eligible voter population, 90 million people did not cast a ballot or even register to vote.
      </h1>
      
  <a 
    href="https://fairvote.org/resources/voter-turnout/?section=what-affects-voter-turnout" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{
    display: 'block',    
    textAlign: 'center',
    textDecoration: 'none',   
    fontWeight: 'bold',       
    fontSize: '1.1rem',       
    marginTop: '20px', 
    color: '#545454',     
     
    }}
  >
    Learn more about voter turnout
    <span style={{ marginLeft: '8px', fontSize: '1.5rem', color: '#545454' }}>
      &rarr;
    </span>
  </a>
         

    </div>
   
    <div
      style={{
        width: '700px',
        height: '400px',
        backgroundColor: '#ededed', 
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#545454',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        borderLeft: '60px solid #95baff',
      }}
    >
     <h1 style={{ 
        fontSize: '2rem',
        textAlign: 'center',
        padding: '20px',

      }}>
        Older Americans (65+) vote at twice the rate of young adults (18-24) in many key elections.
      </h1>
      
  <a 
    href="https://www.thecivicscenter.org/blog/youth-voter-registration-gap" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{
    display: 'block',    
    textAlign: 'center',
    textDecoration: 'none',   
    fontWeight: 'bold',       
    fontSize: '1.1rem',       
    marginTop: '20px', 
    color: '#545454',     
     
    }}
  >
    Learn more about the voter registration gap
    <span style={{ marginLeft: '8px', fontSize: '1.5rem', color: '#545454' }}>
      &rarr;
    </span>
  </a>
      
    </div>
 
    <div
      style={{
        width: '700px',
        height: '400px',
        backgroundColor: '#ededed', 
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#545454',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        borderLeft: '60px solid #f49494',
      }}
    >
     <h1 style={{ 
        fontSize: '2rem',
        textAlign: 'center',
        padding: '20px',

      }}>
        Local elections directly impact what your taxes fund. However, these races are often decided by less than 20% of eligible voters!
      </h1>
      
  <a 
    href="https://effectivegov.uchicago.edu/primers/the-timing-of-local-elections" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{
    display: 'block',    
    textAlign: 'center',
    textDecoration: 'none',   
    fontWeight: 'bold',       
    fontSize: '1.1rem',       
    marginTop: '20px', 
    color: '#545454',     
     
    }}
  >
    Learn more about issues with our local elections
    <span style={{ marginLeft: '8px', fontSize: '1.5rem', color: '#545454' }}>
      &rarr;
    </span>
  </a>
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
