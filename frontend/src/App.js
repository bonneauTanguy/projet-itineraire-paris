// Importations React
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Importations des pages
import Register from './pages/authentification/Register';
import Login from './pages/authentification/Login';
import Logout from './pages/authentification/Logout';
import Home from './pages/Home';

// Importations des components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const user_id = sessionStorage.getItem('id');
  const user_pseudo = sessionStorage.getItem('pseudo');
  const user_token = sessionStorage.getItem('token');

  return (
    <BrowserRouter>
      <Header />
        
        {(!user_id || !user_pseudo || !user_token)
        ?
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        :
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
          </Routes>}

      <Footer />
    </BrowserRouter>
  )
}

export default App;