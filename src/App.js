import { useEffect, useState } from 'react';

import Header from './Header'
import Footer from './Footer'
import Dropdown from './Dropdown'

function App() {
  const validDrivers = ["Lewis Hamilton", "Max Verstappen"];

  const [driver1, setDriver1] = useState('');
  const [driver2, setDriver2] = useState('');

  useEffect(() => {
    fetch('')
  })

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
          <div className='image2'>
            {driver2.length > 0 &&
              <img src={require("./driver-images/" + driver2 + ".avif")} />
            }
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );

}

export default App;
