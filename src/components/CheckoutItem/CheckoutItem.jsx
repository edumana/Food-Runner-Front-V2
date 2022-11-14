import styles from './CheckoutItem.module.css'

const CheckoutItem = (props) => {
  return (
    <>
    <div className={styles.parent}>

      <div className={styles.div2}>
        {props.item}
      </div>
      <div 
      className={styles.div3}
      style={{fontWeight:"bold", textAlign: 'right',fontSize: '0.8em'}}>
        ${Math.round(props.price * 100) / 100}
      </div>
    </div>
    </>
    
  )
}

export default CheckoutItem