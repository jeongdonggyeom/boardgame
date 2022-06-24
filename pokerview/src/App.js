import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Game from './components/Game';
import Poker from './components/Poker';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Poker />}></Route>
        <Route path="/game" element={<Game/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
