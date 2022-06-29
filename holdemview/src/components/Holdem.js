import { useState, useEffect } from "react";
import io from 'socket.io-client'
import '../styleComponents/holdem.css';
import { useLocation, useNavigate } from "react-router-dom";

const socket = io.connect('http://localhost:3000');
window.focus();
let smallbet = 0;
let cards = [];
let otherCards = [];
let shareCards = [];

const Poker = () => {    
    const loc = useLocation();
    const nav = useNavigate();

    const [player, setPlayer] = useState({
        role: '',
        money: 0,
        myCards: []
    });
    const [sequence, setSequence] = useState(0);
    const [panMoney, setPanMoney] = useState(0);
    const [cardOpen, setCardOpen] = useState(false);
    const [gs, setGs] = useState(false);
    const [join, setJoin] = useState(true);
    const [user, setUser] = useState(loc.state[1]);
    const [room, setRoom] = useState(loc.state[0]);
    const [count, setCount] = useState(null);
    const [msg, setMsg] = useState(null);
    const [con, setCon] = useState(null);
    const [name, setName] = useState(null);
    const [send, setSend] = useState(null);

    useEffect(()=>{
        socket.emit('join', room, user);
    }, []);

    useEffect(()=>{
        if(con !== null){
            document.querySelector('#msg').innerHTML = `<span>${con}</span>`
        }
    }, [con])

    useEffect(()=>{
        if(name !== null){
            document.querySelector('#remsg').innerHTML += `<p>${name} : ${send}</p>`
        }
    }, [send])

    useEffect(()=>{
        if(count!==null){
            document.querySelector('#recentlyPeople').innerHTML = `<span>${count}/2</span>`
            if(count===2){
                alert('10초 뒤 게임 시작');
                setTimeout(()=>{
                    console.log("game start");
                    setGs(true);
                    gameStart();
                }, 10000)
            }
        }
    }, [count])

    useEffect(()=>{
        if(sequence === 1){
            if(player.role === 'smallBlind'){
                smallBetting();
            }
        }
        else if(sequence === 2){
            if(player.role === 'bigBlind'){
                bigBetting();
            }
        }
        else if(sequence === 3){
            giveCards('myCards', player.myCards, player.myCards.length);
            socket.emit('cards', player.myCards, room);
            setTimeout(()=>{
                socket.emit('sequence', 4, room);
            }, 1000);
        }
        else if(sequence === 4){
            socket.emit('shareCards', 3, room);
        }
    }, [sequence])

    const leaveRoom = () =>{
        if(room === null){
            alert('떠날 방이 없음')
        }
        else{
            socket.emit('leave', room, user);
            setRoom(null);
            setUser(null);
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
        for(let i=1;i<=2;i++) player.myCards[i] = Math.round(Math.random()*52)+1;
        Number(window.localStorage.getItem('sp')) === 0 ? player.money = 0 : player.money = Number(window.localStorage.getItem('sp'));
        console.log(player);
        socket.emit('setRole');
    }
    const smallBetting = () =>{
        let bet;
        while(sequence===1){
            bet = prompt('베팅 금액 (최대 500원, 숫자로만 입력)');
            if(bet>500 || bet === null) {
                alert('다시 배팅해주세요. (500원 초과 or 값이 없음)');
            }
            else{
                player.money -= bet;
                window.localStorage.setItem('sp', player.money);
                setPanMoney(prev => prev += bet);
                console.log(panMoney);
                console.log(bet);
                socket.emit('panMoney', panMoney, room); // 베팅된 금액 업데이트
                socket.emit('smallbet', bet, room); // 내가 베팅한 금액 보내기
                setTimeout(()=>{
                    socket.emit('sequence', 2, room); // 게임 순서 2번으로 변경
                }, 3000);
                break;
            }
        }
    }
    const bigBetting = () =>{
        let bet;
        while(sequence===2){
            bet = prompt(`smallBlind의 2배를 베팅 (smallBlind의 베팅: ${smallbet})`);
            if(bet===(smallbet*2) || bet !== null){
                player.money -= bet;
                window.localStorage.setItem('sp', player.money);
                setPanMoney(prev => prev += bet);
                socket.emit('panMoney', panMoney, room);
                setTimeout(()=>{
                    socket.emit('sequence', 3, room);
                }, 3000);
                break;
            }
            else{
                alert('다시 베팅해주세요. (2배를 베팅하지 않음)');
            }
        }
    }
    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            sendMsg();
        }
    }
    const giveCards = (tag, cards, size) => {
        setTimeout(()=>{
            document.querySelector(`.${tag}`).innerHTML = "";
            for(let i=1;i<=size;i++){
                if(cards[i] >= 1 && cards[i] <= 13) {
                    if(cards[i] === 4){
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/spade/spade${cards[i]}.svg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }
                    else{
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/spade/spade${cards[i]}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }
                }
                else if(cards[i] >= 14 && cards[i] <= 26) {
                    if(cards[i]-13 === 2 || cards[i]-13 === 3 || cards[i]-13 === 6){
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/diamond/diamond${cards[i]-13}.svg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }
                    else{
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/diamond/diamond${cards[i]-13}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }
                }
                else if(cards[i] >= 27 && cards[i] <= 39) {
                    if(cards[i]-26 === 4){
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/heart/heart${cards[i]-26}.svg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }
                    else{
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/heart/heart${cards[i]-26}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }   
                }
                else if(cards[i] >= 40 && cards[i] <= 52) {
                    if(cards[i]-39 === 2 || cards[i]-39 === 4 || cards[i]-39 === 5 || cards[i]-39 === 7 || cards[i]-39 === 6 || cards[i]-39 === 10){
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/club/club${cards[i]-39}.svg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }
                    else{
                        document.querySelector(`.${tag}`).innerHTML += `<img src="images/club/club${cards[i]-39}.png" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />`
                    }
                }   
            }
        }, 500);
    }
    const giveHiddenCards = (tag, cards, size, repo) =>{
        setTimeout(()=>{
            document.querySelector(`.${tag}`).innerHTML = "";
            for(let i=1;i<=size;i++){
                repo.push(cards[i]);
                document.querySelector(`.${tag}`).innerHTML += '<img src="images/cardback.jpg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />'
            }
        }, 500);
    }

    socket.on('onConnect', (data, c)=>{
        setCon(data);
        setCount(c);
        setJoin(false);
        console.log(con, count, join, data);
    })
    socket.on('onLeave', (data, c)=>{
        setCount(c);
        setCon(data);
        console.log(con, count);
    })
    socket.on('getout', ()=>{
        nav('/');
    })
    socket.on('send', (name, msg)=>{
        console.log(`${name} : ${msg}`)
        setSend(msg);
        setName(name);
    })
    socket.on('otherCards', (mc)=>{
        console.log('실행됨');
        if(JSON.stringify(player.myCards) !== JSON.stringify(mc)) giveHiddenCards('otherCards', mc, 2, otherCards); 
    })
    socket.on('shareCards', (data)=>{
        if(sequence === 4){
            giveHiddenCards('shareCards', data, 3, shareCards);
        }
    })
    socket.once('role', (data)=>{
        player.role = data;
        console.log(player);
        setTimeout(()=>{
            socket.emit('sequence', 1, room);
        }, 3000);
    })
    socket.on('panMoney', (data)=>{
        console.log(data);
        setPanMoney(data);
    })
    socket.on('smallbet', (data)=>{
        console.log(data);
        smallbet = data;
    })
    socket.on('sequence', (data)=>{
        setSequence(data);
    })

    return(
        <div>
            {gs ? 
            <div className="startGame">
                <div className="startGame--div">
                    <div className="startGame--msg" id="remsg"></div>
                    <input 
                        type="text" 
                        onChange={(e)=>{ setMsg(e.target.value) }} 
                        onKeyDown={onKeyDown} 
                        placeholder="보낼 메세지를 입력해주세요."
                        className="gameinput"
                    />
                </div>
                <p className="betting">베팅 액: {panMoney}</p>
                <p className="myMoney">나의 돈: {player.money}</p>
                <div className="cardsDiv">
                    <span className="cardsDiv--span2">상대 카드</span>
                    <div className="otherCards"></div>
                    <span className="shareSpan">공유 카드</span>
                    <div className="shareCards"></div>
                    <span className="cardsDiv--span">내 카드</span>
                    <div className="myCards"></div>
                </div>
            </div> 
            : 
            <div className="game">
                <button onClick={leaveRoom}>방 나가기</button> 
                <span id="recentlyPeople"></span>
                <span className="msg" id="msg"></span>
                <div className="game--msg">
                    <div className="remsg" id="remsg"></div>
                        <input type="text" 
                            onChange={(e)=>{ setMsg(e.target.value) }} 
                            onKeyDown={onKeyDown} 
                            placeholder="보낼 메세지를 입력해주세요."
                        />
                    </div>  
            </div>}
        </div>
    )
}
export default Poker;