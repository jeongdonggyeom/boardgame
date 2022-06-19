import { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000');
const Poker = () => {    
    let join = false;
    const [user, setUser] = useState(" ");
    const [room, setRoom] = useState(" ");
    const [msg, setMsg] = useState(" ");
    const pEl = document.querySelector('.msg');
    const reEl = document.querySelector('.remsg');
    
    const stepRoom = () => {
        socket.on('join', (room, user));
        console.log('실행됨');
    }

    const sendMsg = () => {
        socket.emit('sendMsg', room, user, msg);
        console.log("success");
    }

    socket.on('onConnect', (data)=>{
        pEl.textContent += data;
    })
    socket.on('onLeave', (data)=>{
        pEl.textContent += data;
    })
    socket.on('send', (name, msg)=>{
        reEl.textContent += `${name} : ${msg}`;
    })

    return(
        <div>
          <h1>hello world</h1>
          <input
              type={"text"}
              onChange={(e) => {setUser(e.target.value)}}
          />
          <input 
            type="text"
            onChange={(e)=>{ setRoom(e.target.value) }}
          />
          <button onClick={stepRoom}>방 입장</button>
          <p className="msg"></p>
          { join ? ( 
                <div>
                    <input type="text" onChange={(e)=>{ setMsg(e.target.value) }} />
                    <button onClick={sendMsg}>메세지 전송</button>
                    <p className="remsg"></p>
                </div>    
                ) : ( 
                <p>방 입장 x</p>
              ) }
      </div>
    )
}
export default Poker;