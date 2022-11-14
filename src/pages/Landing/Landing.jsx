import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.about}>
          <header>
          <div className="text-center mt-4">
            <img src="./truck-fast-solid.svg" alt="Pizza Truck Logo"/>
          </div> 
          <h1>Pizza Pirates</h1>

          <p className="mb-1 no-link">Fresh Mediterranean Pizza</p>
          <Link to="/reviewList">
          <p style={{ textDecoration: 'underline #5139F2' }}>See All Reviews</p>
          </Link>
          </header>
        </section>
        <p className="mt-1">Log-in or Sign-up below to order!</p>
        <div style={{width: '90%'}}>
          <Link to="/login">
          <button type="submit" className="btn btn-success" id={styles['login-b']}>Log-In</button>
          </Link>
        </div>
        <p className="my-3">OR</p>
        <div style={{width: '90%'}}>
        <Link to="/signup">
          <button type="submit" className="btn btn-success" id={styles['sign-b']}>Sign-Up</button>
        </Link>  
        </div>
        <div className="mt-5">
        <Link to="/admin" style={{ textDecoration: 'underline #5139F2' }}>
          <p >Sign in as Business Owner</p>
        </Link>  
          <p className='pt-2'>Powered by Food Runner, Inc. ©</p>
        </div>
      </main>
    </> 
  )
}

export default Landing