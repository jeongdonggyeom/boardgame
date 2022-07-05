import { useState, useEffect } from "react";
import io from 'socket.io-client'
import '../styleComponents/holdem.css';
import { useLocation, useNavigate } from "react-router-dom";

const socket = io.connect('http://localhost:3000');    //소켓 정의
window.focus();
let smallbet = 0;   // smallBlind의 제일 처음 베팅의 액수를 저장 나중에 bigBlind가 2배의 액수를 베팅하기 위함
let cards = [];     // 조커를 제외한 52장의 카드를 담는 배열
let otherCards = [];    // 상대의 카드 2장을 저장
let shareCards = [];    // 공유된 5장의 카드를 저장
let myDeck = [];    // 나의 카드 2장과 공유 카드 5장을 저장하는 배열
let message="";     // 보낼 메세지를 저장하는 변수
let pandon=0;       // 게임의 총 베팅액
let myJokbo = {     // 내 덱의 족보
    w: 0,
    jokbo: ""
};
let otherJokbo = {  // 상대 덱의 족보
    w: 0,
    jokbo: ""
};

const Holdem = () => {    
    const loc = useLocation();  // main 페이지에서 방 번호와 이름을 가져오기 위해 useLocation 함수를 사용
    const nav = useNavigate();  // 게임이 끝나면 winorlose로 이동하기 위해 useNavigate 함수를 사용

    const [player, setPlayer] = useState({        
        role: '',   // 역할
        money: 0,   // 가진 돈
        myCards: [] // 내 카드들
    });
    const room = loc.state[0]; // main에서 받아온 room을 저장
    const user = loc.state[1]; // main에서 받아온 user를 저장
    const [sequence, setSequence] = useState(0);    // 게임의 진행 상황
    const [panMoney, setPanMoney] = useState(0);    // 게임의 총 베팅액
    const [gs, setGs] = useState(false);             // 게임 시작 확인
    const [count, setCount] = useState(null);       // 방에 접속한 사람의 수
    const [con, setCon] = useState(null);           // 방에 연결 됐을 때 뜨는 메세지 
    const [name, setName] = useState(null);         // 메세지를 보낸 사람의 이름
    const [send, setSend] = useState(null);         // 메세지 내용

    useEffect(()=>{
        socket.emit('join', room, user);
    }, []);
    
    useEffect(()=>{
        document.querySelector('#msg').innerHTML = `<span>${con}</span>`    // 연결 메세지 띄우기
    }, [con])

    useEffect(()=>{
        if(name !== null){      
            document.querySelector('#remsg').innerHTML += `<p>${name} : ${send}</p>`    // 메시지 띄우기
        }
    }, [send])

    useEffect(()=>{
        if(count!==null){
            document.querySelector('#recentlyPeople').innerHTML = `<span>${count}/2</span>`     // 접속한 사람의 수 띄우기 
            if(count===2 && gs === false){  // 만약 2명이 됐다면 게임 시작
                setGs(true);
                gameStart();
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
                socket.emit('sequence', 5, room);
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
            const sortDeck = myDeck.sort((a, b)=> a.num - b.num );
            console.log(sortDeck);
            socket.emit('showdown', sortDeck, room, player.role);
            setTimeout(()=>{
                socket.emit('ohterDeck', room, player.role);
            }, 1000);
        }
    }, [sequence])

    const leaveRoom = () =>{
        if(room === null){
            alert('떠날 방이 없음')
        }
        else{
            socket.emit('leave', room, user);
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
        smallbet = 0;   
        cards = [];     
        otherCards = [];
        shareCards = [];
        myDeck = [];    
        message="";     
        pandon=0;       
        myJokbo = {     
            w: 0,
            jokbo: ""
        };
        otherJokbo = {  
            w: 0,
            jokbo: ""
        };
        counts = 0;
        for(let i=1;i<=52;i++) cards[i] = i;
        for(let i=1;i<=2;i++) player.myCards[i] = Math.round(Math.random()*52)+1;
        Number(window.localStorage.getItem('sp')) === 0 ? player.money = 0 : player.money = Number(window.localStorage.getItem('sp'));
        socket.emit('setRole', room);
    }
    const smallBetting = () =>{
        let bet;
        if(sequence === 1){
            while(true){
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
        }
        if(sequence === 6 || sequence === 8 || sequence === 11 || sequence === 15){
            while(true){
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
                        break;
                    }
                    else{
                        alert('베팅 실패');
                    }
                }
            }
        }
    }
    const bigBetting = () =>{
        let bet;
        if(sequence === 2){
            while(true){
                bet = prompt(`smallBlind의 2배를 베팅 (smallBlind의 베팅: ${smallbet})`);
                if(bet == (Number(smallbet)*2)){
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
        }
        if(sequence === 5 || sequence === 9 || sequence === 12 || sequence === 14){
            while(true){
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
                        break;
                    }
                    else{
                        alert('베팅 실패');
                    }
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
    socket.on('role', (data)=>{
        player.role = data;
        setTimeout(()=>{
            socket.emit('sequence', 1, room);
        }, 3000);
    })
    socket.on('panMoney', (data)=>{
        setPanMoney(Number(data));
        pandon = panMoney;
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
        let info = {
            r: room,
            u: user,
        };
        if(player.role === data){
            info = {
                r: room,
                u: user,
                deck: myDeck,
                jokbo: myJokbo,
            };
        }
        nav('/winorlose', { state: info });
    })
    socket.on('showdown', (data, jokbo, w)=>{
        if(data === player.role){
            myJokbo.jokbo = jokbo;
            myJokbo.w = w;
        }
        else{
            otherJokbo.jokbo = jokbo;
            otherJokbo.w = w;
        }
        if(myJokbo.jokbo !== "" && otherJokbo.jokbo !== ""){
            if(myJokbo.w < otherJokbo.jokbo) {
                if(player.role === 'smallBlind') socket.emit('die', room, 'bigBlind');
                else socket.emit('die', room, 'smallBlind');
            }
            else{
                if(player.role === 'smallBlind') socket.emit('die', room, 'smallBlind');
                else socket.emit('die', room, 'bigBlind');
            }
        }
    })
    socket.on('otherDeck', (data)=>{
        const role = player.role === 'smallBlind' ? 'bigBlind' : 'smallBlind';
        socket.emit('showdown', data, room, role);
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
                <div className="betting">{`베팅 액: ${panMoney}`}</div>
                <p className="myMoney">{`나의 돈: ${player.money}`}</p>
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
export default Holdem;