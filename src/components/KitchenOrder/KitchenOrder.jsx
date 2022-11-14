
import styles from './KitchenOrder.module.css'

const KitchenOrder= (props) => {


  
  return (
    !props.isFulfilled ?
    <>
    <div className={styles.orderList}>
            <div className={styles.order}>
              <div className={styles.rowOrder}>
                <div className={styles.columnLeftOrder}>
                  <h5>Order: {props.orderId}</h5>
                  <p1>{`Pizzas: ${props.numberPizzas} -
                    Beverages: ${props.numberBev}`}</p1>
                </div>
                <div className={styles.columnRightOrder}>
                  <button
                    type="submit"
                    className="btn btn-success" 
                    id={styles['fulfill']}
                    style={{width: '100px'}}
                    onClick={() => props.handleFulfilled(props._id, props.order)}
                    >Fulfill
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success" 
                    id={styles['view']}
                    style={{width: '100px'}}
                    >View
                  </button>
                </div>
              </div>
            </div>
    </div>
    </>
    :
    <>
    </>
  )
  
  
  
}

export default KitchenOrder