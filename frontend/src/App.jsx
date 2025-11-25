import { useEffect, useState } from 'react'
import axios from 'axios'
import Home from '../src/Components/Home'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import Learn from './Components/Learnit'
import Account from './Pages/Account'
import Login from './Pages/Login'
import Transfer from './Pages/Transfer'
import Balance from './Pages/Balance'
import Dlt from './Pages/Delete'
import Edit from './Pages/Edit'
import Forget from './Pages/Forget'

const App = () => {
  const [display, setDisplay] = useState([]);

  const PyAPI = async () => {
    const response = await axios.get("http://127.0.0.1:5000/users");
    setDisplay(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    PyAPI();
  }, []);

  return (
    <div>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/learn' element={<Learn />} />
        <Route path='/account' element={<Account />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tranfer' element={<Transfer />} />
        <Route path='/balance' element={<Balance />} />
        <Route path='/Delete' element={<Dlt />} />
        <Route path='/edit' element={<Edit />} />
        <Route path='/forget' element={<Forget />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App