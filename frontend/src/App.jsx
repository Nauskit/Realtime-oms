import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import UserDashboard from '../pages/UserDashboard'
import ProductDashboard from '../pages/ProductDashboard'
import LoginPage from '../pages/LoginPage'
import StorePage from '../pages/StorePage'
import OrderPage from '../pages/OrderPage'
import AdminOrderPage from '../pages/AdminOrderPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StorePage />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/product' element={<ProductDashboard />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/admin/:userId' element={<AdminOrderPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

