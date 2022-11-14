// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import PizzaBuilder from './pages/PizzaBuilder/PizzaBuilder'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Admin from './pages/Admin/Admin'
import * as reviewService from './services/reviewService'
import ReviewList from './pages/ReviewList/ReviewList'

import NewReview from './pages/NewReview/NewReview'
import Checkout from './pages/Checkout/Checkout'

// components
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddReview = async (reviewData) => {
    const newReview = await reviewService.create(reviewData)
    setReviews([newReview, ...reviews])
    navigate('/reviewList')
  }

  useEffect(() => {
    const fetchAllReviews = async () => {
      const data = await reviewService.index()
      setReviews(data)
    }
    fetchAllReviews()
  }, [user])

  return (
    <>
      {/* <NavBar user={user} handleLogout={handleLogout} /> */}
      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/checkout/:id"
          element={<Checkout />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/pizza-builder"
          element={
            <ProtectedRoute user={user}>
              <PizzaBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={<Admin />}
        />
        <Route
          path="/reviewList"
          element={
          <ProtectedRoute user={user}>
            <ReviewList reviews={reviews} />
          </ProtectedRoute>
          }  
        />
                
        <Route path="/reviews/new" element={
          <ProtectedRoute user={user}>
            <NewReview handleAddReview={handleAddReview} />
          </ProtectedRoute>
        } />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
