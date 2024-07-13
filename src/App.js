import Header from './Header'
import Footer from './Footer'

function App() {
  const handleClick = () => {

  }
  return (
    <div className="App">
      <Header />
      <div className="content">
        <p>Content goes here</p>
        <button onClick={handleClick}>Compare</button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
