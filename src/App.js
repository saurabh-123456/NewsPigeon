import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from "react-top-loading-bar"
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";

export default class App extends Component {
  state = {
    progress:0,
    apiKey: process.env.REACT_APP_API_KEY
  }
  setProgress = (progress)=>{
    this.setState({progress:progress});
  }
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
            color='black'
            height={3}
            progress={this.state.progress}
          />
          <NavBar />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress}  apiKey = {this.state.apiKey} key="general" pageSize={8} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress = {this.setProgress}  apiKey = {this.state.apiKey} key="business" pageSize={8} country="in" category="business" />} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} apiKey = {this.state.apiKey}  key="technology" pageSize={8} country="in" category="technology" />} />
            <Route path="/sports" element={<News setProgress = {this.setProgress}  apiKey = {this.state.apiKey} key="sports" pageSize={8} country="in" category="sports" />} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress}  apiKey = {this.state.apiKey} key="entertainment" pageSize={8} country="in" category="entertainment" />} />
            <Route path="/health" element={<News setProgress = {this.setProgress} apiKey = {this.state.apiKey} key="health" pageSize={8} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress = {this.setProgress}  apiKey = {this.state.apiKey}key="science" pageSize={8} country="in" category="science" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
