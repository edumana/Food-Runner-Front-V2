import { useState } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Signup.module.css'

const Signup = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <div class="text-center mt-3" style={{}}>
      <img style={{maxWidth: '75px'}} src="./truck-fast-solid.svg" alt="Pizza Truck Logo"/>
    </div>
      <h1>Pizza Pirates</h1>
      <h6 className='mt-1'><strong>Sign-up</strong> below to order!</h6>
      <p className='mt-3' style={{width: '80%'}}>You are seconds away from enjoying<br />our mouth-watering pizza!</p>
      <SignupForm {...props} updateMessage={updateMessage} />
    </main>
  )
}

export default Signup
