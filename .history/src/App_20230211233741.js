import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Routers,
  Routes,
  Route
} from "react-router-dom"

const App = ()=> {

const apiKey=process.env.REACT_APP_NEWS_API

const [progress,setProgress]=useState(0)


setProgress = (progress)=>{
    setProgress({progress:progress})
  }

    return (
      <Routers>
      <>
        <Navbar   />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
       
      />
        <Routes>
        <Route  exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} country="in" category="general" pageSize={9} />} />
        {/* <Route  exact path="/general" element={<News apiKey={apiKey} setProgress={this.setProgress} country="in" key="general" category="general" pageSize={9} />} /> */}
        <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} country="in" key="business" category="business" pageSize={9} />} />
        <Route  exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} country="in" key="entertainment" category="entertainment" pageSize={9} />} />
        <Route  exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} country="in" key="health" category="health" pageSize={9} />} />
        <Route  exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} country="in" key="science" category="science" pageSize={9} />} />
        <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} country="in"  key="sports" category="sports" pageSize={9} />} />
        <Route  exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} country="in" key="technology" category="technology" pageSize={9} />} />
        </Routes>
      </>
      </Routers>
        
    )
  
}

export default App

