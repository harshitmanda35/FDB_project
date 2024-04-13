import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import Register from './components/registration';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/register" element={<Register />} />
     </Routes>
  
  </BrowserRouter>,
    </div>
  );
}

export default App;
