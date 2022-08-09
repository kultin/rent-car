import './css/App.css';
import {Routes, Route} from 'react-router-dom';
import LogIn from './components/LogIn';
import LogUp from './components/LogUp';

import Layout from './components/Layout';
import Catalogue from './pages/Catalogue/Catalogue';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index ></Route> */}
          <Route path="logup" element={<LogUp />}></Route>
          <Route path="login" element={<LogIn />}></Route>          
          {/* <Route path="private" element={<Private />}></Route> */}
          {/* <Route path="game"></Route> */}
          <Route path="cars" element={<Catalogue/>}></Route>
        </Route>
    </Routes>
  );
}

export default App;
