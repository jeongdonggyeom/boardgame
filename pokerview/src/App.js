import './App.css';
import Poker from './components/Poker';
import Loading from './components/Loading';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');
function App() {  
  console.log(socket);
  return (
    <div className="App">
      {socket ? ( <Poker /> ) : ( <Loading/> ) 
       }
    </div>
  );
}

export default App;
