import Content from '../components/LoginForm'
import Navbar from '../components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import DashboardAdmin from '../pages/DashboardAdmin'
import Login from '../pages/Login'
import Feed from '../pages/Feed'
import MainPage from '../pages/MainPage'
import Register from '../pages/Register'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/register' element={<Register />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/dashboard/admin' element={<DashboardAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

