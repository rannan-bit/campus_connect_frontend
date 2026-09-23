import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/Header'
import Home from './page/Home'
import { Routes, Route } from "react-router-dom";
import ReportItem from './components/ReportItem'
import ItemDetails from './components/ItemeDetails'
import Login from './page/Login'
import Register from './page/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Edit from './page/Edit'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/report' element={
          <ProtectedRoute>
            <ReportItem />
          </ProtectedRoute>

        } />
        <Route path='/item/:id' element={<ItemDetails />} />
        <Route path='/edit/:id'element={
          <ProtectedRoute>
            <Edit/>
          </ProtectedRoute>
        } />
      </Routes>

    </>
  )
}

export default App
