import { useState } from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import DriverDropdown from './DriverDropdown';
import YearDropdown from './YearDropdown';
import RaceDropdown from './RaceDropdown';

function App() {
  const baseUrl = 'http://127.0.0.1:8000/visualizations/';

  const [driver1, setDriver1] = useState(0);
  const [driver2, setDriver2] = useState(0);
  const [race, setRace] = useState('');
  const [year, setYear] = useState(0);

  const [races, setRaces] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // const [image, setImage] = useState('');
  // const [positionImage, setPositionImage] = useState('');

  const handleYearSelect = async (e) => {
    setYear(e);
    axios.get(baseUrl + `races/${e}/`)
      .then(response => {
        if (response.data) {
          let obj = JSON.parse(response.data);
          let res = [];

          for (const key in obj) {
            res.push(
              {
                id: Number(key),
                label: obj[key],
                value: obj[key]
              }
            );
          }
          setRaces(res);
        }
      })
      .catch(error => {
        setRaces([]);
        console.error('Error fetching the races:', error);
      });;
  };

  const handleRaceSelect = async (e) => {
    setRace(e);
    axios.get(baseUrl + `drivers/${year}/${e}/`)
      .then(response => {
        if (response.data) {
          let obj = JSON.parse(response.data);
          let res = []

          for (const key in obj) {
            let val = JSON.parse(obj[key]);
            res.push(
              {
                id: Number(val['DriverNumber']),
                label: val['FullName'],
                value: Number(val['DriverNumber'])
              }
            );
          }
          setDrivers(res);
        }
      })
      .catch(error => {
        setDrivers([]);
        console.error('Error fetching the drivers:', error);
      });;
  };

  return (
    <div className="App">
      <Header />
      <div className='intro'>
        <p>Welcome to F1 Driver Comparison! With this app, you can compare two drivers head-to-head with past statistics and telemetry data.</p>
      </div>

      <div className='year'>
        <YearDropdown onSelect={handleYearSelect} />
      </div>

      <div className='race'>
        <RaceDropdown dropdownOptions={races} onSelect={handleRaceSelect} />
      </div>

      <div className="content">
        <div className='driver1'>
          <div className='input1'>
            <DriverDropdown dropdownOptions={drivers} onSelect={setDriver1} />
          </div>
          <div className='image1'>
            {driver1.length > 0 &&
              <img src={require("./driver-images/" + driver1 + ".avif")} />
            }
          </div>
        </div>

        <div className='driver2'>
          <div className='input2'>
            <DriverDropdown dropdownOptions={drivers} onSelect={setDriver2} />
          </div>
          <div className='image2'>
            {driver2.length > 0 &&
              <img src={require("./driver-images/" + driver2 + ".avif")} />
            }
          </div>
        </div>

      </div>


      {/* <div className='telemetryPlot'>
        {image ? <img src={`data:image/png;base64,${image}`} alt="F1 Plot" /> : <p>This selection does not exist. Please try a different combination of drivers or race.</p>}
      </div>

      <div className='positionPlot'>
        {image ? <img src={`data:image/png;base64,${positionImage}`} alt="F1 Plot" /> : <p>This selection does not exist. Please try a different combination of drivers or race.</p>}
      </div> */}

      <Footer />
    </div>
  );

}

export default App;
