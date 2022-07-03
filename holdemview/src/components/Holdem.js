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
let myDeck = [];
let otherDeck;
let message="";
let pandon=0;
let myJokbo;
let otherJokbo;

const Poker = () => {    
    const loc = useLocation();
    const nav = useNavigate();

    const player = {
        role: '',
        money: 0,
        myCards: []
    };
    const [sequence, setSequence] = useState(0);
    const [panMoney, setPanMoney] = useState(0);
    const [gs, setGs] = useState(true);
    const [user, setUser] = useState(loc.state[1]);
    const [room, setRoom] = useState(loc.state[0]);
    const [count, setCount] = useState(null);
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
            giveCards('myCards', player.myCards, 1, player.myCards.length);
            socket.emit('cards', player.myCards, room);
            setTimeout(()=>{
                socket.emit('sequence', 4, room);
            }, 500);
        }
        else if(sequence === 4){
            socket.emit('shareCards', 5, room);
            alert('15초 후 첫 번째 베팅이 시작됩니다.')
            setTimeout(()=>{
                for(let i=0;i<7;i++){
                    if(i<2){
                        if(player.myCards[i] <= 13) myDeck.push({
                            pae: 'spade',
                            num: i
                        });
                        else if(player.myCards[i] <= 26) myDeck.push({
                            pae: 'diamond',
                            num: i
                        });
                        else if(player.myCards[i] <= 39) myDeck.push({
                            pae: 'heart',
                            num: i
                        });
                        else if(player.myCards[i] <= 52) myDeck.push({
                            pae: 'club',
                            num: i
                        });
                    }
                    else{
                        if(player.myCards[i] <= 13) myDeck.push({
                            pae: 'spade',
                            num: i
                        });
                        else if(player.myCards[i] <= 26) myDeck.push({
                            pae: 'diamond',
                            num: i
                        });
                        else if(player.myCards[i] <= 39) myDeck.push({
                            pae: 'heart',
                            num: i
                        });
                        else if(player.myCards[i] <= 52) myDeck.push({
                            pae: 'club',
                            num: i
                        });
                    }
                }
                socket.emit('sequence', 5, room);
            }, 15000);
        }
        else if(sequence === 5){
            if(player.role === 'bigBlind'){
                bigBetting();
            }
        }
        else if(sequence === 6){
            if(player.role === 'smallBlind'){
                smallBetting();
            }
        }
        else if(sequence === 7){
            alert('공유 카드 오픈');
            giveCards('shareCards', shareCards, 1, 3);
            alert('15초 뒤 두 번째 베팅이 시작됩니다.');
            setTimeout(()=>{
                socket.emit('sequence', 8, room);
            }, 15000)
        }
        else if(sequence === 8){
            if(player.role === 'smallBlind'){
                smallBetting();
            }
        }
        else if(sequence === 9){
            if(player.role === 'bigBlind'){
                bigBetting();
            }
        }
        else if(sequence === 10){
            alert('턴 카드 오픈');
            giveCards('shareCards', shareCards, 4, 4);
            alert('15초 뒤 세 번째 베팅이 시작됩니다.')
            setTimeout(()=>{
                socket.emit('sequence', 11, room);
            }, 15000);
        }
        else if(sequence === 11){
            if(player.role === 'smallBlind'){
                smallBetting();
            }
        }
        else if(sequence === 12){
            if(player.role === 'bigBlind'){
                bigBetting();
            }
        }
        else if(sequence === 13){
            alert('리버 카드 오픈');
            giveCards('shareCards', shareCards, 5, 5);
            alert('15초 뒤 마지막 베팅이 시작됩니다.');
            setTimeout(()=>{
                socket.emit('sequence', 14, room);
            }, 15000);
        }
        else if(sequence === 14){
            if(player.role === 'bigBlind'){
                bigBetting();
            }
        }
        else if(sequence === 15){
            if(player.role === 'smallBlind'){
                smallBetting();
            }
        }
        else if(sequence === 16){
            alert('Showdown 승패 가리기');
            const sortDeck = myDeck.sort((a, b)=>{ a.num - b.num });
            console.log(sortDeck);
            socket.emit('showdown', sortDeck, room, player.role);
            setTimeout(()=>{
                socket.emit('ohterDeck', room, player.role);
            }, 1000);
        }
    }, [sequence])

    useEffect(()=>{
        if(sequence !== 0){
            document.querySelector('.betting').innerHTML = `<p>베팅 액: ${panMoney}</p>`;
        }
    }, [panMoney])

    useEffect(()=>[
        document.querySelector('.myMoney').innerHTML = `<p>나의 돈: ${player.money}</p>`
    ], [player]);

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
        else if(message === null){
            alert('보낼 메세지가 없음')
        }
        else{
            socket.emit('sendMsg', room, user, message)
        }
    }
    const gameStart = () => {
        pandon = 0;
        smallbet = 0;
        cards = [];
        otherCards = [];
        shareCards = [];
        myDeck = [];
        myJokbo="";
        otherJokbo="";
        for(let i=1;i<=52;i++) cards[i] = i;
        for(let i=1;i<=2;i++) player.myCards[i] = Math.round(Math.random()*52)+1;
        Number(window.localStorage.getItem('sp')) === 0 ? player.money = 0 : player.money = Number(window.localStorage.getItem('sp'));
        socket.emit('setRole', room);
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
                pandon += bet;
                socket.emit('panMoney', pandon, room); // 베팅된 금액 업데이트
                socket.emit('smallbet', bet, room); // smallBlind가 베팅한 금액 보내기
                setTimeout(()=>{
                    socket.emit('sequence', 2, room); // 게임 순서 2번으로 변경
                }, 1000);
                break;
            }
        }
        while(sequence===6 || sequence === 8 || sequence === 11 || sequence === 15){
            bet = prompt('베팅 금액을 입력해주세요');
            if(bet !== 0 && player.money >= bet){
                player.money -= bet;
                window.localStorage.setItem('sp', player.money);
                pandon += bet;
                socket.emit('panMoney', pandon, room);
                setTimeout(()=>{
                    socket.emit('sequence', sequence+1, room);
                }, 1000);
                break;
            }
            else{
                if(player.money === 0){
                    socket.emit('die', room, player.role);
                }
                else{
                    alert('베팅 실패');
                }
            }
        }
    }
    const bigBetting = () =>{
        let bet;
        while(sequence === 2){s
            bet = prompt(`smallBlind의 2배를 베팅 (smallBlind의 베팅: ${smallbet})`);
            if(bet === (smallbet*2)){
                player.money -= bet;
                window.localStorage.setItem('sp', player.money);
                pandon += bet;
                socket.emit('panMoney', pandon, room);
                setTimeout(()=>{
                    socket.emit('sequence', 3, room);
                }, 1000);
                break;
            }
            else{
                alert('다시 베팅해주세요. (2배를 베팅하지 않음)');
            }
        }
        while(sequence === 5 || sequence === 9 || sequence === 12 || sequence === 14){
            bet = prompt('베팅 금액을 입력해주세요');
            if(bet !== 0 && player.money >= bet){
                player.money -= bet;
                window.localStorage.setItem('sp', player.money);
                pandon += bet;
                socket.emit('panMoney', pandon, room);
                setTimeout(()=>{
                    socket.emit('sequence', sequence+1, room);
                }, 1000);
                break;
            }
            else{
                if(player.money === 0){
                    socket.emit('die', room, player.role);
                }
                else{
                    alert('베팅 실패');
                }
            }
        }
    }
    const onKeyDown = (e) => {
        if(e.key === 'Enter'){
            sendMsg();
        }
    }
    const giveCards = (tag, cards, fsize, lsize) => {
        setTimeout(()=>{
            document.querySelector(`.${tag}`).innerHTML = "";
            for(let i=fsize;i<=lsize;i++){
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
    const giveHiddenCards = (tag, cards, fsize, lsize, repo) =>{
        setTimeout(()=>{
            document.querySelector(`.${tag}`).innerHTML = "";
            for(let i=fsize;i<=lsize;i++){
                repo.push(cards[i]);
                document.querySelector(`.${tag}`).innerHTML += '<img src="images/cardback.jpg" alt="icon" className="card" style="width: 100px; height: 150px; margin-left: 5px;" />'
            }
        }, 500);
    }

    socket.on('onConnect', (data, c)=>{
        setCon(data);
        setCount(c);
    })
    socket.on('onLeave', (data, c)=>{
        setCount(c);
        setCon(data);
    })
    socket.on('getout', ()=>{
        nav('/');
    })
    socket.on('send', (name, msg)=>{
        setSend(msg);
        setName(name);
    })
    socket.on('otherCards', (mc)=>{
        if(JSON.stringify(player.myCards) !== JSON.stringify(mc)) giveHiddenCards('otherCards', mc, 1, 2, otherCards); 
    })
    socket.on('shareCards', (data)=>{
        if(sequence === 4){
            giveHiddenCards('shareCards', data, 1, 3, shareCards);
        }
    })
    socket.once('role', (data)=>{
        player.role = data;
        setTimeout(()=>{
            socket.emit('sequence', 1, room);
        }, 3000);
    })
    socket.on('panMoney', (data)=>{
        setPanMoney(Number(data));
    })
    socket.on('smallbet', (data)=>{
        smallbet = Number(data);
    })
    socket.on('sequence', (data)=>{
        setSequence(data);
    })
    socket.on('die', (data)=>{
        data === 'smallBlind' ? socket.emit('win', room, 'bigBlind') : socket.emit('win', room, 'smallBlind');
    })
    socket.on('win', (data)=>{
        let info = [];
        info.push(room);
        info.push(user);
        if(player.role === data){
            info.push('win');
            info.push(name);
            info.push(myDeck);
        }
        nav('/winorlose', { state: info });
    })
    socket.on('showdown', (data, jokbo)=>{
        data === player.role ? myJokbo = jokbo : otherJokbo = jokbo;
    })
    socket.on('otherDeck', (data)=>{
        otherDeck = data;
    })

    return(
        <div>
            {gs ? 
            <div className="startGame">
                <div className="startGame--div">
                    <div className="startGame--msg" id="remsg"></div>
                    <input 
                        type="text" 
                        onChange={(e)=>{ message = e.target.value }} 
                        onKeyDown={onKeyDown} 
                        placeholder="보낼 메세지를 입력해주세요."
                        className="gameinput"
                    />
                </div>
                <div className="betting"></div>
                <p className="myMoney"></p>
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
                            onChange={(e)=>{ message = e.target.value }} 
                            onKeyDown={onKeyDown} 
                            placeholder="보낼 메세지를 입력해주세요."
                        />
                    </div>  
            </div>}
        </div>
    )
}
export default Poker;