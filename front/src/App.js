import './css/App.scss';
import { Routes, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import LogUp from './components/LogUp';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="logup" element={<LogUp />} />
        <Route path="login" element={<LogIn />} />
        {/* <Route path="private" element={<Private />}></Route> */}
        {/* <Route path="cars" element={<Cars/>}></Route> */}
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
