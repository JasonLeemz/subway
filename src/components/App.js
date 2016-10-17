import React, { Component } from 'react';
import Header from './Header';
import MapBase from './MapBase';
import '../res/styles/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <MapBase/>
      </div>
    );
  }
}

export default App;
