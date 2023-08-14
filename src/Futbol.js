import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Adjust the path to your CSS file
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Futbol() {
  const [results, setResults] = useState([]);
  const [currentResults, setCurrentResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentResults(results.length > 0 ? results[0].sportResults : []);
  }, [results]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://alfred.to/reservas/sports-nation/v2/soccer`,
        {
          headers: {
            Authorization:
              "Basic QWxmcmVkOlREODI0MThZYlBweCpuWDV4WDNrSlRrVFNeRTZndQ==",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);

        setResults(data);
        
      } else {
        console.log('API Error:', response.statusText);
      }
    } catch (error) {
      console.log('Fetch Error:', error);
    }
  };

  const showPremiereResults = () => {
    const premiereLeague = results[0].sportLeagues.find(item => item.league === 'Premiere League');
    if (premiereLeague) {
      setCurrentResults(premiereLeague.sportResults);
      setActiveIndex(0);
    }
  };

  const showMexicoResults = () => {
    const mexicoLeague = results[0].sportLeagues.find(item => item.league === 'Primera División de México');
    if (mexicoLeague) {
      setCurrentResults(mexicoLeague.sportResults);
      setActiveIndex(0);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? currentResults.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === currentResults.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="App">
<div className="container-nd-general">
      <div className="container-nd">
     

      <div className='button-container-nd'>
      <button onClick={showPremiereResults}> Premiere League</button>
      <button onClick={showMexicoResults}> Primera División de México</button>
      </div>
 
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          {currentResults ? (
            currentResults.map((result, index) => (
              <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={result.id}>
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                  <img style={{ width: '530px' }} src={result.teamAIcon} alt="" />
                  <p style={{fontSize:'250px', fontWeight:'bold'}}>vs</p>
                  <img style={{ width: '530px' }} src={result.teamBIcon} alt="" />
                </div>
                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column' }}>
                  <p style={{fontSize:'100px', fontWeight:'bold', color:'white'}}>07:30</p>
                  <p style={{fontSize:'100px', fontWeight:'bold', color:'white'}}>Estadio Azteca</p>

                </div>
              </div>
            ))
          ) : (
            <p>Nenhum resultado disponível</p>
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrev}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={handleNext}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Futbol;
