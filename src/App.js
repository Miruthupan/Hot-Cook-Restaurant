import './App.css';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/login';
import SignUp from './pages/Signup';
import ReservationForm from './pages/ReservationForm';
import CheckoutForm from './pages/CheckoutForm';
import AdminPage from './pages/AdminPage';
import Products from './pages/Products';
import AdminReservations from './pages/AdminReservations';
import AdminOrders from './pages/AdminOrders';
import Logo from './utils/img/logo.png';

function App() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user-related data (e.g., user ID, token, session info)
    localStorage.removeItem("userId");
     // If using token-based auth
    // Clear other relevant session information if stored

    // Redirect to the main page
    window.location.href = "/";
  };
 

  return (
    <div>
      <Navbar expand="lg" className='fixed-top bg-body-tertiary shadow'>
        <Container>
          <Navbar.Brand>
          <img src={Logo} height={70}/>
          
            <Link to="/" className='navbar-brand text-success fw-semibold'>
              
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto justify-content-end w-100'>
              <Nav.Link href='/' className='active text-uppercase'>Home</Nav.Link>
              
              <Nav.Link href='/menu' className='text-uppercase'>Menu</Nav.Link>
              <Nav.Link href='/about' className='text-uppercase'>About</Nav.Link>
              <Nav.Link href='/reservation' className='text-uppercase'>Reservation</Nav.Link>
              <Nav.Link href='/contact' className='text-uppercase'>Contact</Nav.Link>
              <Nav.Link href='/login' className='text-uppercase'>Login</Nav.Link>
              <Nav.Link href='/signup' className='text-uppercase'>Signup</Nav.Link>
              <Nav.Link className='text-uppercase' onClick={handleLogout}>logout</Nav.Link>
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reservation' element={<Login />} />
        <Route path='/reservations' element={<ReservationForm />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/products' element={<Products/>} />
        <Route path='/AdminReservations' element={<AdminReservations/>}/>
        <Route path='/AdminOrders' element={<AdminOrders/>}/>
      </Routes>

      <footer className='bg-body-tertiary'>
        <p className='p-3 m-0 text-center'>copyright @ miruthupan</p>
      </footer>
    </div>
  );
}

export default App;
