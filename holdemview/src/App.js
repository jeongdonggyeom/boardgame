import './App.css';
import Holdem from './components/Holdem';
import Main from './components/Main'
import Winorlose from './components/Winorlose';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {  
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/game" element={<Holdem/>}></Route>
          <Route path="/winorlose" element={<Winorlose/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
