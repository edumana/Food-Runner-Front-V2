import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LoginForm.module.css'
import * as authService from '../../services/authService'



const LoginForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  })
  const navigate = useNavigate()

  const handleChange = e => {
    props.updateMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/pizza-builder')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <>
    <div className="main-body" style={{marginTop: '20px'}}>
    <div className="text-center mt-2">
      <img src="./truck-fast-solid.svg" alt="Pizza Truck Logo"/>
    </div>
    <h1 className='mb-3'>Pizza Pirates</h1>
    <h6 className='mb-3'><strong>Log-in</strong> below to start your order</h6>
    <p className='mb-4'>You are seconds away from enjoying<br />our mouth-watering pizza!</p>
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <input
          className="form-control"
          placeholder="Email"
          type="text"
          autoComplete="off"
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          className="form-control"
          placeholder="Password"
          type="password"
          autoComplete="off"
          id="password"
          value={formData.pw}
          name="pw"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3" style={{width:'85%'}}>
        <button type="submit" className="btn btn-success" id={styles['login-b']}>Log-In</button>
        <p>{props.message}</p>
      </div>
      <div className="mt-5">
      <Link to="/admin" style={{ textDecoration: 'underline #5139F2' }}>
        <p className="mb-4" style={{paddingBottom: 0}}>Sign in as Business Owner</p>
      </Link>  

        <p>Powered by Food Runner, Inc. ©</p>
      </div>
    </form>
    </div>  
    </>
  )
}

export default LoginForm