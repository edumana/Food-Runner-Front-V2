import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ReviewForm.module.css'
import * as authService from '../../services/authService'

const ReviewForm = props => {

  const handleSubmit = async e => {
    e.preventDefault()
    try {
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <>
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <input
          className="reviewForm"
          placeholder="Write a Review"
          type="text"
          autoComplete="off"
          id="reviewInput"
          name="review"
        />
      </div>
    
      <div className={styles.inputContainer}>
        <Link to='/reviewList'>
        <button type="submit" className="reviewSubmitBtn" id={styles['sign-b']}>
          Submit Review
        </button>
        </Link>
      </div>
      <p className='mt-3'>Powered by Food Runner, Inc. ©</p>
    </form>
    </>
  )
}

export default ReviewForm