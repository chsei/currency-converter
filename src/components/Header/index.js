import React from 'react'
import styles from './styles.module.css'

const Header = () => {
  return (
  <header className={styles.Header}>
    <h1>Currency Converter&nbsp;<i className="fa fa-money" aria-hidden="true"></i></h1>
  </header> 
  )
}

export default Header