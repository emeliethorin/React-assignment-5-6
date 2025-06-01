import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import DogGuessingGame from './components/DogGuessingGame.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<DogGuessingGame />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
