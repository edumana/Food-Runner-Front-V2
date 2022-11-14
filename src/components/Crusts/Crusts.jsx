import styles from './Crusts.module.css'
import { useState } from 'react'

const Crusts = props => {

  return(
    props.selected ?
    <div 
      className={styles.crustDiv} 
      style={{borderColor: '#119DA4', backgroundColor:'#c8ece8'}} 
      onClick={() => props.handleClick(props.id)}
      >
        <h5 style={{ color: '#119DA4', margin: 0}}>{props.name}</h5>
    </div> 
    :
    <div 
      className={styles.crustDiv}
      style={{borderColor: 'gray'}} 
      onClick={() => props.handleClick(props.id)}
      >
        <h5 style={{ color: 'gray', margin: 0}}>{props.name}</h5>
    </div>
    
  )
}

export default Crusts