import { useState, useRef, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import Inventory from "../../components/Inventory/Inventory"
import * as inventoryService from '../../services/inventoryService'
import styles from './PizzaBuilder.module.css'

const PizzaBuilder = (props) => {
  
  const location = useLocation()
  const [inventory, setInventory] = useState([])
  
  useEffect(() => {
    const fetchAllInventory = async () => {
      const inventoryData = await inventoryService.getAll()
      setInventory(inventoryData)
    }
    fetchAllInventory()
  },[])

  return (
    <>
      <div className={styles.container}>
        <Inventory inventory={inventory} />
      </div>
    </>
  )
}

export default PizzaBuilder