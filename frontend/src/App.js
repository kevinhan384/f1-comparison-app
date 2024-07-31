import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './Header'
import Footer from './Footer'
import DriverDropdown from './DriverDropdown'
import YearDropdown from './YearDropdown';

function App() {
  const [driver1, setDriver1] = useState('');
  const [driver2, setDriver2] = useState('');
  const [race, setRace] = useState('');
  const [year, setYear] = useState(2018);

  const [image, setImage] = useState('');

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/visualizations/plot_laptimes', {
  //     params: {
  //       driver1: driver1,
  //       driver2: driver2,
  //     }
  //   })
  //     .then(response => {
  //       if (response.data.image) {
  //         setImage(response.data.image);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching the F1 data:', error);
  //     });
  // }, []);

  const handleClick = async () => {
    await axios.post('http://127.0.0.1:8000/userselections/', {
      driver1: driver1,
      driver2: driver2,
      year: year
    })
    axios.get('http://127.0.0.1:8000/userselections/')
      .then(response => {
        if (response.data.image) {
          setImage(response.data.image);
        }
      })
      .catch(error => {
        console.error('Error fetching the F1 data:', error);
      });
  }

  return (
    <div className="App">
      <Header />
      <div className='intro'>
        <p>Welcome to F1 Driver Comparison! With this app, you can compare two drivers head-to-head with past statistics and telemetry data.</p>
      </div>
      <div className="content">
        <div className='driver1'>
          <div className='input1'>
            <DriverDropdown onSelect={setDriver1} />
          </div>
          <div className='image1'>
            {driver1.length > 0 &&
              <img src={require("./driver-images/" + driver1 + ".avif")} />
            }
          </div>
        </div>

        <div className='driver2'>
          <div className='input2'>
            <DriverDropdown onSelect={setDriver2} />
          </div>
          <div className='image2'>
            {driver2.length > 0 &&
              <img src={require("./driver-images/" + driver2 + ".avif")} />
            }
          </div>
        </div>

      </div>

      <div className='year'>
        <YearDropdown onSelect={setYear} />
      </div>

      <div className='button'>
        <button onClick={handleClick}>Click me</button>
      </div>

      <div className='telemetry_plot'>
        {image ? <img src={`data:image/png;base64,${image}`} alt="F1 Plot" /> : <p>Please try a different combination of drivers or races.</p>}
      </div>

      <Footer />
    </div>
  );

}

export default App;
