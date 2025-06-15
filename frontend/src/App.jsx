import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import UserDashboard from '../pages/UserDashboard'
import ProductDashboard from '../pages/ProductDashboard'
import LoginPage from '../pages/LoginPage'
import StorePage from '../pages/StorePage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/users/admin' element={<UserDashboard />} />
          <Route path='/product/' element={<ProductDashboard />} />
          <Route path='/store/' element={<StorePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

