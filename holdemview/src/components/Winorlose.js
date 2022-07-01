import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client'

const socket = io.connect('https://holdem.bssm.kro.kr');
function Winorlose()
{
    const nav = useNavigate();
    const loc = useLocation();

    const [name, setName] = useState(null);
    const [send, setSend] = useState(null);
    const [user, setUser] = useState('user');
    const [room, setRoom] = useState(0);

    // useEffect(()=>{
    //     socket.emit('join', room, user);
    // }, []);

    useEffect(()=>{
        if(name !== null){
            document.querySelector('#remsg').innerHTML += `<p>${name} : ${send}</p>`
        }
    }, [send]);

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
            <p className="winName">user1의 승리</p>
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
                    <span className='jokbo'>user1의 패: 풀하우스</span>
                    <div className='cards'>
                        <img src="images/spade/spade2.png" className='card' alt='icon' />
                        <img src="images/spade/spade2.png" className='card' alt='icon' />
                        <img src="images/spade/spade2.png" className='card' alt='icon' />
                        <img src="images/spade/spade1.png" className='card' alt='icon' />
                        <img src="images/spade/spade1.png" className='card' alt='icon' />
                    </div>
                </div>
            </div>
            <button onClick={nav('/')} className="winbutton">메인화면으로 가기</button>
        </div>
    )
}
export default Winorlose;