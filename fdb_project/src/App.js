import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Register from './components/registration';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HotelPage from './components/hotel';
import HotelDetailsPage from './components/hotelDetails';
import BookingConfirmationPage from './components/booking';
import NavBar from './components/navbar';
import Department from './components/departments';
import StaffsPage from './components/staff';
import MaintenacePage from './components/maintenance';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <NavBar/>
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/hotels" element={<HotelPage />} />
     <Route path="/user/hotel_details/:hotelId" element={<HotelDetailsPage/>} />
     <Route path="/booking/:booking_id/:rooms_booked" element={<BookingConfirmationPage/>} />
     <Route path="/department" element={<Department />} />
     <Route path="/staff" element={<StaffsPage/>} />
     <Route path="/maintenance" element={<MaintenacePage/>} />
     </Routes>
  
  </BrowserRouter>,
    </div>
  );
}

export default App;
