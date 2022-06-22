import { useState, useEffect } from "react";
import io from 'socket.io-client'
import '../poker.css';

const socket = io.connect('http://localhost:3000');
const Poker = () => {    
    let cards = [];
    let myCards = [];

    const [count, setCount] = useState("");
    const [user, setUser] = useState("");
    const [room, setRoom] = useState(0);
    const [msg, setMsg] = useState("");
    const [con, setCon] = useState("");
    const [lea, setLea] = useState("");
    const [name, setName] = useState("");
    const [send, setSend] = useState("");

    useEffect(()=>{
        document.querySelector('#msg').innerHTML += `<p>${con}</p>`
    }, [con])

    useEffect(()=>{
        document.querySelector('#msg').innerHTML += `<p>${lea}</p>`
    }, [lea])

    useEffect(()=>{
        document.querySelector('#remsg').innerHTML += `<p>${name} : ${send}</p>`
    
    }, [name])
    useEffect(()=>{
        document.querySelector('#recentlyPeople').innerHTML = `<p>${count}/2</p>`
    }, [count])

    const stepRoom = () => {
        socket.emit('join', room, user);
        console.log('실행됨');
    }
    const leaveRoom = () =>{
        socket.emit('leave', room, user);
        document.querySelector('#msg').innerHTML = " ";
    }
    const sendMsg = () => {
        socket.emit('sendMsg', room, user, msg);
        console.log("success");
    }
    const gameStart = () => {
        for(let i=1;i<=52;i++) cards.push(i);
        for(let i=0;i<4;i++) myCards.push(Math.floor(Math.random()*52)+1);
        for(let i=0;i<4;i++){
            if(myCards[i] >= 1 && myCards[i] <= 13) document.querySelector('#myCards').innerHTML += `스페이드 ${myCards[i]}`
            else if(myCards[i] >= 14 && myCards[i] <= 26) document.querySelector('#myCards').innerHTML += `다이아몬드 ${myCards[i]}`
            else if(myCards[i] >= 27 && myCards[i] <= 39) document.querySelector('#myCards').innerHTML += `하트 ${myCards[i]}`
            else if(myCards[i] >= 40 && myCards[i] <= 52) document.querySelector('#myCards').innerHTML += `클로버 ${myCards[i]}`
        }
    }

    socket.on('onConnect', (data, c)=>{
        console.log(data);
        setCount(c);
        setCon(data);  
    })
    socket.on('onLeave', (data, c)=>{
        console.log(data)
        setCount(c);
        setLea(data);
    })
    socket.on('send', (name, msg)=>{
        console.log(`${name} : ${msg}`)
        setSend(msg);
        setName(name);
    })
    socket.on('start', ()=>{
        gameStart();
    })

    return(
        <div>
          <h1>hello world</h1>
          <p id="recentlyPeople"></p>
          <input
              type={"text"}
              onChange={(e) => {setUser(e.target.value)}}
          />
          <input 
            type="text"
            onChange={(e)=>{ setRoom(e.target.value) }}
          />
          <button onClick={stepRoom}>방 입장</button>
          <button onClick={leaveRoom}>방 나가기</button> 
          <p className="msg" id="msg"></p>
          <div>
            <input type="text" onChange={(e)=>{ setMsg(e.target.value) }} />
            <button onClick={sendMsg}>메세지 전송</button>
            <p className="remsg" id="remsg"></p>
          </div>
          <p>나의 카드들</p>
          <div id="myCards"></div>
      </div>
    )
}
export default Poker;