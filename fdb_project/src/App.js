import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Register from './components/registration';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HotelPage from './components/hotel';
import HotelDetailsPage from './components/hotelDetails';
import BookingConfirmationPage from './components/booking';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/user/hotels" element={<HotelPage />} />
     <Route path="/user/hotel_details/:hotelId" element={<HotelDetailsPage/>} />
     <Route path="/booking/:booking_id/:rooms_booked" element={<BookingConfirmationPage/>} />
     </Routes>
  
  </BrowserRouter>,
    </div>
  );
}

export default App;
