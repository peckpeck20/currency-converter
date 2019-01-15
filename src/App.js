import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import InputFormUI from './components/Form'
import 'typeface-roboto';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
}

getRates = () => {
  axios
  .get("http://data.fixer.io/api/latest?access_key=f3b49bf578c9c8820c0ef517abe6a038&format=1")
  .then(response => {
    //console.log(response.data.rates);
    this.setState({
      data: response.data.rates
    });
  })
  .catch(error => {
    console.log(error);
});
}

componentDidMount() {
  this.getRates()
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Currency Converter</h1>          
        </header>
      <InputFormUI rates={this.state.data} />
      </div>
    );
  }
}

export default App;
