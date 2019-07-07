import React, {Fragment} from 'react'
import styles from './styles.module.css'

const Converter = props => {
  return (
    <div className={styles.Converter}>
      {
        props.data.errorOccured ? <p className={styles.alert}>an fetch data error has occurred</p>:
        <Fragment>
          <form onSubmit={props.handleSubmit}>
            <p>
              <label>Please enter your amount:</label>
            </p>

            <input 
              onChange={props.handleChange} 
              className={styles.input}
              type="number" 
              placeholder="amount" 
              name="currentValue" 
              min="0"
            /> <i className="fa fa-eur"></i>  

            <p>
              <label>Please select your convert currency:</label>
            </p>

            {/** Create select of currencies from rates object */}
            <select name="toCurrency" onChange={props.handleChange} value={props.data.toCurrency}>
              {Object.keys(props.data.rates).map(currency => <option key={currency}>{currency}</option>)}
            </select>
          </form>

          <hr className={styles.hr} />

          {/* show the result of the convert method */}
          <p className={styles.result}>
            {props.data.currentValue} <span className={styles.currency}>{props.data.fromCurrency}</span>
            <span className={styles.exchange}>
              <i className="fa fa-exchange" aria-hidden="true"></i>
            </span>
            {props.data.currentConvert} <span className={styles.currency}>{props.data.toCurrency}</span>
          </p>
        </Fragment>
      }
    </div>
  )
}

export default Converter