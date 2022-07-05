import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Main()
{
    const nav = useNavigate();
    const [user, setUser] = useState();
    const [room, setRoom] = useState();
    let info = [];

    const stepRoom = () => {
        if(room === null){
            alert('방 번호가 없음')
        }
        else if(user === null){
            alert('이름이 없음')
        }
        else{
            info.push(room);
            info.push(user);
            nav('/game', {state: info})
            console.log('실행됨');
        }
    }

    const supportFund = () =>{
        if(Number(window.localStorage.getItem('sp')) < 2000){
            window.localStorage.setItem('sp', Number(window.localStorage.getItem('sp'))+1000);
        }
        else{
            alert('지원금을 받을 수 없습니다.');
        }
    }

    return(
        <div className="poker">
            <h1 className="poker--h1">TEXAS HOLD'EM</h1>
            <button onClick={supportFund} className="supportFund">지원금 받기</button>
            <div className="stepRoom">
                <div>
                    <span>이름:</span><input type="text" onChange={(e) => {setUser(e.target.value)}}/>
                </div>
                <div>
                    <span>방 번호:</span><input type="number" onChange={(e)=>{ setRoom(e.target.value) }} min="0" max="2" />    
                </div>
                <button onClick={stepRoom}>방 입장하기</button>
            </div>
        </div>
    )
}
export default Main;