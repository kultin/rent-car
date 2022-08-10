import './css/App.scss';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import Registration from './components/Registration';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound'
import Private from './components/Private/Private'
import Catalogue from './pages/Catalogue/Catalogue';
import Car from './components/Car/Car'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<LogIn />} />
        <Route path="private" element={<Private />}/>        
        <Route path="cars" element={<Catalogue/>}></Route>
        <Route path="car/:id" element={<Car/>}></Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
