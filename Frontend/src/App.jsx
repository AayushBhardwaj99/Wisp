import React from 'react'
import Navbar from './Components/Navbar'
import { Routes , Route} from "react-router-dom"
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'

const App = () => {
  return (

  <div>

    <Navbar/>

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
    </Routes>

  </div>

  )
}

export default App
