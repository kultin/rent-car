import './css/App.scss';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/Auth/Login/Login';
import Registration from './components/Auth/Registration/Registration';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound'
import Private from './components/Private/Private'
import Catalogue from './pages/Catalogue/Catalogue';
import Car from './components/Car/Car'
// import Footer from './components/Footer/Footer'
import { getBookingsThunk } from './store/userActions'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllBookingsAC, setCarsAC, setLikesAC } from './store/action';
import { useEffect } from 'react'
import { setLoadingUA } from './store/userActions'
import Footer from './components/Footer/Footer';


function App() {

  const dispatch = useDispatch()

  const user = useSelector((store) => (store.user.user))

  useEffect(() => {
    // dispatch(setLoadingUA(true))
    axios.get('http://localhost:3005/cars')
      .then((res) => dispatch(setCarsAC(res.data)))
  }, [dispatch])

  useEffect(() => {
    if (user.name != undefined) {
      dispatch(getBookingsThunk())
    }
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3005/bookings/all')
      .then((res) => dispatch(getAllBookingsAC(res.data)))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3005/likes')
      .then((res) => dispatch(setLikesAC(res.data)))
  }, [])

  return (
    <>
      <main className='main'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<><Home /><Footer/></>} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<LogIn />} />
            <Route path="private" element={<><Private /><Footer/></>} />
            <Route path="cars" element={<><Catalogue /><Footer/></>}></Route>
            <Route path="car/:id" element={<><Car /><Footer/></>}></Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
