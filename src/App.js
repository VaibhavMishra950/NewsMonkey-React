import './App.css';
import React, { useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


const App = () => {

  const pageSize = 6;

  // Temporary API Key 1 (jojel79723@sceath.com)
  // const apiKey = "be4c55d55228451690b7db072adb6949"

  // Temporary API Key 2 (reken88919@sceath.com)
  // const apiKey = "4ee921aa3bf34fbe98b143da93872e3e"

  // CodeWithHarry API Key
  const apiKey = "dbe57b028aeb41e285a226a94865f7a7"

  // Original API Key
  // const apiKey = process.env.REACT_APP_NEWS_API;


  const [progress, setProgress] = useState(0)
  
  function handleScroll() {
    window.scroll({
      top: 0,
      left: 0, 
      behavior: 'smooth',
    });
  }

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} country="in" category='General' />} />
          <Route path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} country="in" category='Entertainment' />} />
          <Route path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} country="in" category='Business' />} />
          <Route path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} country="in" category='Health' />} />
          <Route path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} country="in" category='Science' />} />
          <Route path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} country="in" category='Sports' />} />
          <Route path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} country="in" category='Technology' />} />

        </Routes>
      </Router>
      <button onClick={handleScroll} className='buttonForTop'>
        <i className="fa-duotone fa-chevrons-up"></i>
      </button>
    </div>

  )
}

export default App;
