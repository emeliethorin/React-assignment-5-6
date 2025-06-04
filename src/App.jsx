import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Registration from './components/Registration.jsx';
import Login from './components/Login.jsx';
import DogGuessingGame from './components/DogGuessingGame.jsx';
import RedirectHandler from './RedirectHandler.jsx';

function App() {
  return (
    <>
    <BrowserRouter basename="/react-assignment-5-6">
    <RedirectHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<DogGuessingGame />} />
        </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
