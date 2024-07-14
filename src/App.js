import { useState } from 'react';

import Header from './Header'
import Footer from './Footer'

function App() {
  const validDrivers = ["Lewis Hamilton", "Max Verstappen"];

  const [driver1, setDriver1] = useState('');
  const [driver2, setDriver2] = useState('');
  const [driverName1, setDriverName1] = useState('');
  const [driverName2, setDriverName2] = useState('');
  const [displayDriver1, setDisplayDriver1] = useState('');
  const [displayDriver2, setDisplayDriver2] = useState('');
  // const [error1, setError1] = useState('');
  // const [error2, setError2] = useState('');

  const isValidDriver = (driver) => {
    return validDrivers.includes(driver);
  }
  const handleClick = (driver1, driver2) => {
    if (isValidDriver(driver1)) {
      setDisplayDriver1(require("./" + driver1.split(/\s+/)[1].toLowerCase() + ".avif"));
      // setError1('');
      console.log(displayDriver1);
    } else {
      setDisplayDriver1('');
      // setError1('Invalid driver name');
    }
    if (isValidDriver(driver2)) {
      setDisplayDriver2(require("./" + driver2.split(/\s+/)[1].toLowerCase() + ".avif"));
      // setError2('');
    } else {
      setDisplayDriver2('');
      // setError2('Invalid driver name');
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className='intro'>
          <p>Welcome to F1 Driver Comparison! With this app, you can compare two drivers head-to-head with past statistics and real-time telemetry.</p>
        </div>

        <div className='input1'>
          <input type='text' placeholder='Enter first driver name' value={driver1} onChange={(e) => setDriver1(e.target.value)} />
        </div>
        <div className='input2'>
          <input type='text' placeholder='Enter second driver name' value={driver2} onChange={(e) => setDriver2(e.target.value)} />
        </div>

        <div className='button'>
          <button onClick={() => handleClick(driver1, driver2)}>Compare</button>
        </div>

        <div className='image1'>
          {displayDriver1.length > 0 &&
            <img src={displayDriver1} />
          }
        </div>

        <div className='image2'>
          {displayDriver2.length > 0 &&
            <img src={displayDriver2} />
          }
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default App;
