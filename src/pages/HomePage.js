import React, { useState} from 'react';
import ResultsPage from './ResultsPage';
//import { STATE_API_KEY } from '@env';



const Input = ({ type, placeholder, value, onChange, style }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // Forward the onChange event
      style={style}
    />
  );
};



function Homepage () {

  const [address, setAddress] = useState(''); 
  const [route, setRoute ]= useState('home');

  const [resultsData, setResultsData] = useState();

  //when user inputs adress that adress gets stored in address variable (state)
  const handleAddressChange = (event) => {
    setAddress(event.target.value); 
    console.log("Address input:", event.target.value); 
  };

// when search button is hit this goes and fetches data from civic api based off the entered address
    const handleSearch = async () => {
     // console.log("API Key from env:", process.env.STATE_API_KEY);

      
      //const apiKey = process.env.STATE_API_KEY; 
     // const url = `https://v3.openstates.org/people.geo?lat=27.9944&lng=-81.7603&apikey=STATE_API_KEY`; 

      // try {
      //   const response = await fetch(url);
        
      //   if (!response.ok) {
    
      //     throw new Error(`Error: ${response.status} - ${response.statusText}`);
      //   }

      //   const data = await response.json();
      //   console.log("Civic API Response:", data); 

        
      //   setResultsData(data);
        
       
        setRoute('results'); 
        
      // } catch (error) {
      //   console.error("Failed to fetch data from the Civic API:", error);
        
      //   alert("Search failed. Please ensure the address is correct.");
      // }
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
      page = <ResultsPage/>;
    }

  return ( <div>
    {page}
  </div>
  
  );
};


export default Homepage;
