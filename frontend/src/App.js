import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './Header'
import Footer from './Footer'
import Dropdown from './Dropdown'

function App() {
  const validDrivers = ["Lewis Hamilton", "Max Verstappen"];

  const [driver1, setDriver1] = useState('');
  const [driver2, setDriver2] = useState('');
  const [race, setRace] = useState('');
  const [year, setYear] = useState('');

  const [image, setImage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/visualizations/plot_laptimes/')
      .then(response => {
        if (response.data.image) {
          setImage(response.data.image);
        }
      })
      .catch(error => {
        console.error('Error fetching the F1 data:', error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className='intro'>
        <p>Welcome to F1 Driver Comparison! With this app, you can compare two drivers head-to-head with past statistics and real-time telemetry.</p>
      </div>
      <div className="content">
        <div className='d1'>
          <div className='input1'>
            <Dropdown onSelect={setDriver1} />
          </div>
          <div className='race'>
            <input type='text' value={race} onChange={(e) => setRace(e.target.value)} />
          </div>
          <div className='image1'>
            {driver1.length > 0 &&
              <img src={require("./driver-images/" + driver1 + ".avif")} />
            }
          </div>
        </div>

        <div className='d2'>
          <div className='input2'>
            <Dropdown onSelect={setDriver2} />
          </div>
          <div className='year'>
            <input type='text' value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
          <div className='image2'>
            {driver2.length > 0 &&
              <img src={require("./driver-images/" + driver2 + ".avif")} />
            }
          </div>
        </div>

        {image ? <img src={`data:image/png;base64,${image}`} alt="F1 Plot" /> : <p>Loading...</p>}

      </div>
      <Footer />
    </div>
  );

}

export default App;
