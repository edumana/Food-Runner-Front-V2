import { useState, useRef, useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem'
import * as orderService from '../../services/orderService'
import styles from './Checkout.module.css'

const Checkout = (props) => {
  
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [pizzas, setPizzas ] = useState([])
  const [total, setTotal ] = useState(0)
  const [beverages, setBeverages ] = useState([])
  const [pizzaData, setPizzaData ] = useState(null)

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await orderService.show(id)
      setOrder(data)
    }
    fetchOrder()
  }, [id])

  useEffect(() => {
    setPizzas(order?.pizzas)
    setBeverages(order?.beverages)
  }, [order])
  
  useEffect(() => {
    if(!pizzas?.length) return
    const priceData = pizzas?.map(pizza => 
      pizza?.ingredients.reduce((previous, current) => 
        previous + current.price
      ,0)  
    )
    const nameData = pizzas?.map(pizza => 
      pizza?.ingredients.reduce((previous, current) => 
        `${current.name}, ${previous}` 
      ,'')  
    )

    const data = []
    for (let i = 0; i < nameData.length; i++){
      data[i] = {pizzaName: nameData[i], pizzaPrice: priceData[i]}
    }
    setPizzaData(data)

    const pizzaTotal = priceData.reduce((prev, curr) => 
      prev + curr
    , 0)

    const beverageTotal = beverages.reduce((prev, curr) =>
      prev + curr.price
    , 0)
    
    setTotal(beverageTotal+pizzaTotal)
  }, [pizzas, beverages])

  const handleContinue = async (e) => {
    navigate(`/reviews/new`)
  }

  const handleDelete = async (e) => {
    orderService.delete(id)
    navigate('/pizza-builder')
  }

  return (
    pizzaData ? 
    <>
    <div className={styles.parent}>
      <div className={styles.div1}>
        <h1>Pizza Pirates</h1>
        <h6>Your Order:</h6>
      </div>
      <div className={styles.div2}>
        <h5 style={{fontSize: '1em', textDecoration: 'underline'}}>Your Pizzas</h5>
        {pizzaData?.map(element => 
          <CheckoutItem 
            item={element.pizzaName}
            price={element.pizzaPrice}  
          />
        )}
        <h5 style={{marginTop: '20px',fontSize: '1em',textDecoration: 'underline' }}>Your Beverages</h5>
        {beverages?.map(element => 
          <CheckoutItem 
            item={element.name}
            price={element.price}  
          />
        )} 
      </div>

      <div className={styles.div3}>

        <table className={styles.table}>
            <tr>
              <td><h5>Total:</h5></td>
              <td style={{ textAlign: 'right' }}>${Math.round(total * 100) / 100}</td>
            </tr>
        </table>

        <form
          autoComplete="off"
          onSubmit={e => handleContinue(e)}
          className={styles.container}
        >
          <button type="submit" className="btn btn-success" id={styles['checkout']}>Checkout</button>
        </form>

        <form
          autoComplete="off"
          onSubmit={e => handleDelete(e)}
          className={styles.container}
        >
          <button type="submit" className="btn btn-success" id={styles['delete']}>Delete Cart</button>
        </form>

      </div>
    </div>
    </>
    :
    'Loading...'
  )
}

export default Checkout