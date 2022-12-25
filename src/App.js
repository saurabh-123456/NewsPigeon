import React, { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from "react-top-loading-bar"
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

const App = ()=> {
  const [progress, setProgress] = useState(0);
  const apiKey = process.env.REACT_APP_API_KEY;
  
    return (
      <div>
        <Router>
        <LoadingBar
            color='black'
            height={3}
            progress={progress}
          />
          <NavBar />
          <Routes>
            <Route path="/" element={<News setProgress = {setProgress}  apiKey = {apiKey} key="general" pageSize={8} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress = {setProgress}  apiKey = {apiKey} key="business" pageSize={8} country="in" category="business" />} />
            <Route path="/technology" element={<News setProgress = {setProgress} apiKey = {apiKey}  key="technology" pageSize={8} country="in" category="technology" />} />
            <Route path="/sports" element={<News setProgress = {setProgress}  apiKey = {apiKey} key="sports" pageSize={8} country="in" category="sports" />} />
            <Route path="/entertainment" element={<News setProgress = {setProgress}  apiKey = {apiKey} key="entertainment" pageSize={8} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress = {setProgress} apiKey = {apiKey} key="health" pageSize={8} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress = {setProgress}  apiKey = {apiKey}key="science" pageSize={8} country="in" category="science" />} />
          </Routes>
        </Router>
      </div>
    )
}
export default App;
