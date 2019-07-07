import React, { Component, Fragment } from 'react';
import './App.css';

import moment from 'moment'

import Header from './components/Header'

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
   * Fetch the data when the component is mounted
   */
  componentDidMount = () => {
    this.fetchData()
  }

  render() {
    /**
     * Destructuring state
     */
    const { isLoading, rates, rateUpdate, currentValue, currentConvert, fromCurrency, toCurrency } = this.state
    return (
      <div className="App">
        <Header />
        <div className="main">
          {
            isLoading ? <p>Loading...</p> :
            
            // can be moved to a converter component
            <div className="converter">

              {this.state.errorOccured ? <p className="alert">an network error has occurred</p>: 
                <Fragment>
                  <form onSubmit={this.handleSubmit}>
                    <p>
                      <label>Please enter your amount:</label>
                    </p>

                    <input 
                      onChange={this.handleChange} 
                      type="number" 
                      placeholder="amount" 
                      name="currentValue" 
                      min="0"
                    /> <i className="fa fa-eur"></i>  

                    <p>
                      <label>Please select your convert currency:</label>
                    </p>

                    {/** Create select of currencies from rates object */}
                    <select name="toCurrency" onChange={this.handleChange} value={toCurrency}>
                      {Object.keys(rates).map(currency => <option key={currency}>{currency}</option>)}
                    </select>
                  </form>

                  <hr/>

                  {/* show the result of the convert method */}
                  <p className="converter__result">
                    {currentValue} <span className="currency">{fromCurrency}</span>
                    <i className="fa fa-exchange" aria-hidden="true"></i>
                    {currentConvert} <span className="currency">{toCurrency}</span>
                  </p>
                </Fragment>
              }
            </div>
          }
        </div>
        
        <footer className="footer"><p>latest rates update: {rateUpdate}</p></footer>
      </div>
    );
  }
}

export default App;
