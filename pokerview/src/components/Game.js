import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styleComponents/game.css'

const socket = io.connect('http://localhost:3000');
function Game(){
    const state = useLocation();
    console.log(state);
    let cards = [];
    let myCards = [];

    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);
    const [count, setCount] = useState("");
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
        if(count===2){
            gameStart();
        }
    }, [count])

    const leaveRoom = () =>{
        if(room === null){
            alert('떠날 방이 없음')
        }
        else{
            socket.emit('leave', room, user);
            setRoom(null);
            setUser(null);
            document.querySelector('#msg').innerHTML = " ";
        }
    }
    const sendMsg = () => {
        if(room === null){
            alert('방에 들어가있지 않음')
        }
        else if(user === null){
            alert('이름이 없음')
        }
        else if(msg === null){
            alert('보낼 메세지가 없음')
        }
        else{
            socket.emit('sendMsg', room, user, msg)
            console.log('실행')
        }
    }
    const gameStart = () => {
        for(let i=1;i<=52;i++) cards[i] = i;
        for(let i=1;i<=4;i++) myCards[i] = Math.round(Math.random()*52)+1;
        for(let i=1;i<=4;i++){
            if(myCards[i] >= 1 && myCards[i] <= 13) {
                document.querySelector('#myCards').innerHTML += `<img src="images/spade/spade${myCards[i]}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
            }
            else if(myCards[i] >= 14 && myCards[i] <= 26) {
                if(myCards[i]-13 === 2 || myCards[i]-13 === 3 || myCards[i]-13 === 6){
                    document.querySelector('#myCards').innerHTML += `<img src="images/diamond/diamond${myCards[i]-13}.svg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                }
                else{
                    document.querySelector('#myCards').innerHTML += `<img src="images/diamond/diamond${myCards[i]-13}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                }
            }
            else if(myCards[i] >= 27 && myCards[i] <= 39) {
                if(myCards[i]-26 === 4){
                    document.querySelector('#myCards').innerHTML += `<img src="images/heart/heart${myCards[i]-26}.svg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                }
                else{
                    document.querySelector('#myCards').innerHTML += `<img src="images/heart/heart${myCards[i]-26}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                }
            }
            else if(myCards[i] >= 40 && myCards[i] <= 52) {
                if(myCards[i]-39 === 2 || myCards[i]-39 === 4 || myCards[i]-39 === 5 || myCards[i]-39 === 7){
                    document.querySelector('#myCards').innerHTML += `<img src="images/club/club${myCards[i]-39}.svg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                }
                else{
                    document.querySelector('#myCards').innerHTML += `<img src="images/club/club${myCards[i]-39}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                }
            }
        }
    }
    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            sendMsg()
        }
    }

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

    return(
        <div>
            <p id="recentlyPeople"></p>
            <button onClick={leaveRoom}>방 나가기</button> 
          <p className="msg" id="msg"></p>
          <div>
            <div className="remsg" id="remsg"></div>
            <input type="text" onChange={(e)=>{ setMsg(e.target.value) }} onKeyDown={onKeyDown} />
          </div>
          <p>나의 카드들</p>
          <div id="myCards"></div>
        </div>
    )
}
export default Game;