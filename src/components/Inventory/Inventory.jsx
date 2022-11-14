import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Inventory.module.css'
import Crusts from '../Crusts/Crusts'
import Items from '../Items/Items'
import CartBuilder from '../CartBuilder/CartBuilder'
import * as authService from '../../services/authService'
import * as orderService from '../../services/orderService'

const Inventory = props => {
  const [inventory, setInventory] = useState()
  const navigate = useNavigate()

  const crust = props.inventory.filter(element => 
    element.type === 'crust'
  )

  const beverages = props.inventory.filter(element => 
    element.type === 'beverages'
  )

  const ingredients = props.inventory.filter(element => 
    element.type === 'ingredient'
  )

  const [selectedCrust, setCrustSelection] = useState('')
  const [selectedIngredients, setIngredients] = useState([])
  const [selectedBeverages, setBeverages] = useState([])
  const [addedPizzas, setAddedPizzas] = useState([{}])
  const [addedBeverages, setAddedBeverages] = useState([])
  
  const [order, setOrder] = useState({
    pizzas: [], 
    beverages: []
  })

  const resetOptions = () => {
    setCrustSelection('')
    setIngredients([])
    setBeverages([])
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false )
  }
  const handleClick = (id) => {
    setCrustSelection(crust.find(element => element._id === id))
  }

  const handleAddToCart = (event) => {
    event.preventDefault()

    const newPizza = [
      ...selectedIngredients,
      selectedCrust._id
    ].filter(ing => ing !== undefined)

    setOrder({
      pizzas: newPizza.length > 0 ? 
      [...order.pizzas, {
        ingredients: [...newPizza]
      }]
      :
      [...order.pizzas]
      , 
      beverages: [...order.beverages, ...selectedBeverages]
    })
    resetOptions()
  }

  const handleCheckout = (event) => {
    event.preventDefault()
    handleSubmitDatabase()
    
  }

  const handleSubmitDatabase = async () => {
    const newOrder = await orderService.create(order)
    console.log(newOrder._id)
    navigate(`/checkout/${newOrder._id}`)
  }

  const handleBeverage = (id, event) => {
    if (event.target.checked) {
      setBeverages([...selectedBeverages, id])
    } else {
      setBeverages(selectedBeverages.filter(element => element !== id))
    }
  }

  const handleIngredient = (id, event) => {
    if (event.target.checked) { 
      setIngredients([...selectedIngredients, id])
    } else {      
      setIngredients(selectedIngredients.filter(element => element !== id))
    }
  }

  return (
    <>
    <div className={styles.parent}>
      <div className={styles.div1}>
        <h1>Pizza Pirates</h1>
        <h6 style={{textAlign: 'center'}}>Build your Own Pizza</h6> 
      </div>
      <div className={styles.div2}>
        <div className={styles.containerFluid}>
          {crust.map((element, idx) => 
            <Crusts
              id={element._id}
              name={element.name}
              handleClick={handleClick}
              selected={element._id === selectedCrust._id ? true : false}
            />  
          )}
        </div>
      </div>
      <div className={styles.div3}>
        <div style={{width: '100%'}}>
        <h5 style={{fontSize: '1.0em',textDecoration: 'underline'}}>Ingredients:</h5>
        <div className={styles.ingredientDiv}>
          {ingredients.map(element =>
          <Items
            name={element.name}
            id={element._id}
            handleFunction={handleIngredient}
        />
        )}
        </div>
        <h5 style={{fontSize: '1.0em', textDecoration: 'underline'}}>Beverages:</h5>
        <div className={styles.ingredientDiv}>
          {beverages.map(element => 
          <Items
            name={element.name}
            id={element._id}
            handleFunction={handleBeverage}
          />
          )}
          
          </div>
        </div>
      </div>
      <CartBuilder 
            handleAddToCart={handleAddToCart}
            handleCheckout={handleCheckout}
            pizzas={order.pizzas.length}
            beverages={order.beverages.length}
          />
    </div>
    </>
  )
}

export default Inventory