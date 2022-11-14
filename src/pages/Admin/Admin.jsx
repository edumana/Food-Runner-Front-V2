import { useState, useRef, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import * as orderService from '../../services/orderService'
import styles from './Admin.module.css'
import KitchenOrder from "../../components/KitchenOrder/KitchenOrder"

const Admin = (props) => {
  
  const location = useLocation()
  const [orderData, setOrderData] = useState([])
  const [orderUpdate, setOrderUpdate] = useState(0)
  const [sales, setSales] = useState(0)
  const [numberOrders, setNumberOrders] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await orderService.getAll()
      setOrderData(orderData.reverse())
    }
    fetchOrders()
  }, [orderUpdate])

  const handleFulfilled = (id, order) => {
    
    setNumberOrders(numberOrders+1)
    const beveragesPrice = order.beverages.reduce((prev, curr)=>
      prev + curr.price
    ,0)

    const pizzaPrice = order.pizzas.map(pizza => 
      pizza.ingredients.reduce((previous, current) => 
        previous + current.price
      ,0)  
    )

    const pizzaTotal = pizzaPrice.reduce((prev, curr) => 
      prev + curr
    , 0)

    setSales(sales+beveragesPrice+pizzaTotal)
    orderService.fulfill(id)
    setOrderUpdate(orderUpdate+1)
  }

  const goToBuilder = () => {
    navigate('/')
  }
  
  return (
    <>
    <main className={styles.main}>
      <div className={styles.parent}>
        <div className={styles.div1}>
          <h1>Pizza Pirates/Admin</h1>
        </div>
        <div className={styles.div2}>
          <button type="submit" 
            className="btn btn-success" 
            id={styles['signout']}
            onClick={() => goToBuilder()}
            >Log Out
          </button>
        </div>
        <div className={styles.div3}>
        <h5>Incoming Orders:</h5>
          <div className={styles.orderList}>
            {orderData.map(order => 
              <KitchenOrder 
                numberPizzas={order.pizzas.length}
                numberBev={order.beverages.length}
                orderId={order._id.split('').slice(-4).join('')}
                _id={order._id}
                isFulfilled={order.isFulfilled}
                handleFulfilled={handleFulfilled}
                order={order}
              />
            )}
          </div>
        </div>    
        <div className={styles.div4}>
        <h6>Today at a glance:</h6>
        <div className={styles.subdiv}>
          <div className={styles.row}>
            <div className={styles.columnLeft}>Sales:</div>
            <div className={styles.columnRight}>${Math.round(sales * 100) / 100}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.columnLeft}>Orders:</div>
            <div className={styles.columnRight}>{numberOrders}</div>
          </div>
        </div>
        </div>
        <div className={styles.div5}></div>
      </div>
    </main>
		</>
  )
}

export default Admin