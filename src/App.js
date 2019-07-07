import React, { Component } from 'react';
import './App.css';

import moment from 'moment'

import Header from './components/Header'
import Footer from './components/Footer'
import Converter from './components/Converter'

class App extends Component {

  state = {
    apiUrl: 'http://data.fixer.io/api/latest?',
    apiKey: process.env.REACT_APP_API_KEY,
    data: {},
    rates: {},
    rateUpdate: '',
    currentValue: null,
    fromCurrency: 'EUR',
    toCurrency:'USD',
    currentConvert: null,
    isLoading: false,
    errorOccured: false
  }

  /**
   * Method to fetch data from API.
   * Supports change base currency.
   * Only for higher plans than free plan.
   * Requires the development of an 'invertCurrency' method.
   * Or manually changing it in the state
   */
  fetchData() {
    this.setState({isLoading: true})
    fetch(`${this.state.apiUrl}access_key=${this.state.apiKey}&base=${this.state.fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        if (data.success){
          const rates = data.rates
          const rateUpdate = moment(data.date).format('L')
          this.setState({
            data,
            rates,
            rateUpdate,
            isLoading: false,
            errorOccured: false
         })
        } else {
          this.setState({isLoading: false, errorOccured: true})
        }
      })
  }

  /**
   * Method to cancel the default event on submit
   */
  handleSubmit = e => {
    e.preventDefault()
  }

  /**
   * Method to listen change on input and select.
   * And run the checkEntry method
   */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, this.checkEntry)
  }

  /**
   * Method to check if the current value is not an empty string.
   * Prevents running of the convert method.
   * The check of the value itself is done by the input (input type="number")
   */
  checkEntry = () => {
    (this.state.currentValue !== '') ? this.convert() : this.setState({currentConvert: ''})
  }

  /**
   * Method to convert a value into the chosen currency
   */
  convert = () => {
    const currentConvert = this.state.currentValue * this.state.rates[this.state.toCurrency]
    this.setState({
      currentConvert: currentConvert.toFixed(2)
    })
  }

  /**
   * Fetch data when the component is mounted
   */
  componentDidMount = () => {
    this.fetchData()
  }

  render(){
    /**
     * Destructuring state
     */
    const { isLoading } = this.state
    return (
      <div className="App">
        <Header />
        
        <div className="main">
          {
            isLoading ? <p>Loading...</p> :
            
            <Converter 
              data={this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />

          }
        </div>
        
        <Footer info={this.state.rateUpdate} />
      </div>
    );
  }
}

export default App;
