import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import '../styleComponents/poker.css';

const socket = io.connect('http://localhost:3000');
const Poker = () => {    
    const userInfo = [];
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);

    const stepRoom = () => {
        if(room === null){
            alert('방 번호가 없음')
        }
        else if(user === null){
            alert('이름이 없음')
        }
        else{
            socket.emit('join', room, user);
            console.log('실행됨');
        }
    }

    socket.on('onConnect', (data, c)=>{
        console.log(data);
        for(let i=0;i<4;i++){
            if(i===0) userInfo.push(user);
            if(i===1) userInfo.push(room);
            if(i===2) userInfo.push(data);
            if(i===3) userInfo.push(c);
        }
        navigate('/game', { state: userInfo })
    })

    return(
        <div className="poker">
          <h1 className="poker--h1">POKER</h1>
          <div className="startGame">
            <div>
                <span>이름:</span><input type={"text"} onChange={(e) => {setUser(e.target.value)}}/>
            </div>
            <div>
                <span>방 번호:</span><input type="text" onChange={(e)=>{ setRoom(e.target.value) }}/>    
            </div>
            <button onClick={stepRoom}>방 입장하기</button>
          </div>
      </div>
    )
}
export default Poker;