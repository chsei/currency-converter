import React from 'react'
import styles from './styles.module.css'

const Footer = ({info}) => {
  return (
    <footer className={styles.Footer}><p>latest rates update: {info}</p></footer>
  )
}

export default Footer