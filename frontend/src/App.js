// Importations React
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Importations des pages
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

  if (!user_id || !user_pseudo || !user_token) {
    return (
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/' element={<Register />} /> */}
        </Routes>
        
        <Navigate to='/' replace />

        <Footer />
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Header />
  
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/home' element={<Home />} />
        </Routes>
  
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;