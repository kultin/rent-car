import './css/App.scss';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/Auth/Login/LogIn';
import Registration from './components/Auth/Registration/Registration';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound'
import Private from './components/Private/Private'
import Catalogue from './pages/Catalogue/Catalogue';
import Car from './components/Car/Car'
import Footer from './components/Footer/Footer'

import { useDispatch } from 'react-redux'
import axios from 'axios';
import { setCarsAC } from './store/action';
import { useEffect } from 'react'


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get('http://localhost:3005/cars')
      .then((res)=> dispatch(setCarsAC(res.data)))
  }, [dispatch])

  return (
    <>
    <main className='main'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<LogIn />} />
          <Route path="private" element={<Private />} />
          <Route path="cars" element={<Catalogue />}></Route>
          <Route path="car/:id" element={<Car />}></Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
    <Footer/>
    </>
  );
}

export default App;
