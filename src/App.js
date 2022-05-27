import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

  pageSize = 6;

  // Temporary API Key 1 (jojel79723@sceath.com)
  // apiKey = "be4c55d55228451690b7db072adb6949"

  // Temporary API Key 2 (reken88919@sceath.com)
  // apiKey = "4ee921aa3bf34fbe98b143da93872e3e"
  
  // CodeWithHarry API Key
  apiKey = "dbe57b028aeb41e285a226a94865f7a7"
  
  // Original API Key
  // apiKey = process.env.REACT_APP_NEWS_API;



  constructor() {
    super();
    this.state = {
      progress: 0
    }
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }


  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country="in" category='General' />} />
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country="in" category='Entertainment' />} />
            <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} country="in" category='Business' />} />
            <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} country="in" category='Health' />} />
            <Route path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} country="in" category='Science' />} />
            <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country="in" category='Sports' />} />
            <Route path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country="in" category='Technology' />} />
          </Routes>
        </Router>
      </div>

    )
  }
}
