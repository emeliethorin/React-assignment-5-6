import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import DogGuessingGame from './components/DogGuessingGame.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game" element={<DogGuessingGame />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
