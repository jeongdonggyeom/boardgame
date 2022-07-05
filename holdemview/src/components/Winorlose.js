import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000');    // 소켓 정의
function Winorlose()
{
    const nav = useNavigate();  
    const loc = useLocation();  

    const [name, setName] = useState(null);
    const [send, setSend] = useState(null);
    const room = loc.state.room;
    const user = loc.state.user;

    useEffect(()=>{
        socket.emit('join', room, user);    // 방에 접속
    }, []);

    useEffect(()=>{
        if(name !== null){
            document.querySelector('#remsg').innerHTML += `<p>${name} : ${send}</p>`
        }
    }, [send]);

    useEffect(()=>{
        document.querySelector('cards').innerHTML = "";
        for(let i=0;i<loc.state.myDeck.length;i++){
            document.querySelector('cards').innerHTML += loc.state.myDeck[i]
        }
    }, []);

    let message;

    const sendMsg = () => { 
        if(room === null){
            alert('방에 들어가있지 않음')
        }
        else if(user === null){
            alert('이름이 없음')
        }
        else if(message === null){
            alert('보낼 메세지가 없음')
        }
        else{
            socket.emit('sendMsg', room, user, message)
            console.log('실행')
        }
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            sendMsg();
        }
    }

    socket.on('send', (name, msg)=>{
        console.log(`${name} : ${msg}`)
        setSend(msg);
        setName(name);
    })
    return(
        <div className='winrootdiv'>
            <p className="winName">{loc.state.user}</p>
            <div className='win'>
                <div className="win--div">
                    <div className="win--divMsg" id="remsg"></div>
                    <input 
                        type="text" 
                        onChange={(e)=>{ message = e.target.value }} 
                        onKeyDown={onKeyDown} 
                        placeholder="보낼 메세지를 입력해주세요."
                        className="win--input"
                    />
                </div>
                <div className='winDiv'>
                    <span className='jokbo'>{`${loc.state.user}의 패: ${loc.state.jokbo}`}</span>
                    <div className='cards'></div>
                </div>
            </div>
            <button onClick={nav('/')} className="winbutton">메인화면으로 가기</button>
        </div>
    )
}
export default Winorlose;