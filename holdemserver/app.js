const express = require('express');
const http = require('http');
const path = require("path");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "https://holdem.bssm.kro.kr",
        credentials: true
    }
});
const room = ['room1', 'room2', 'room3'];
let count = [0, 0, 0];
let cards = [];
let shareCards = [];
let currentUser = [];
let smallDeck = [];
let bigDeck = [];
let role = [];
for(let i=1;i<=52;i++){
    cards[i] = i;
}
for(let i=0;i<3;i++){
    let arr = [];
    let role = ['smallBlind', 'bigBlind'];
    currentUser[i] = arr;
    shareCards[i] = arr;
    smallDeck[i] = arr;
    bigDeck[i] = arr;
    role[i] = role;
}
function royal(deck)
{
    let royalStraightFlush = 0;
    for(let i=0;i<7;i++){
        if(deck[i].pae === deck[i+1].pae){
            if(deck[i].num+1 === deck[i+1].num){
                if(deck[i].num === 10 || deck[i].num === 11 || deck[i].num === 12 || deck[i].num === 13) royalStraightFlush++;
            }
            if(deck[0].num === 1) royalStraightFlush++;
        }
    }
    return royalStraightFlush >= 5 ? true : false;
}
function sf(deck)
{
    let straightFlush = 0;
    for(let i=0;i<7;i++){
        if(deck[i].pae === deck[i+1].pae){
            if(deck[i].num+1 === deck[i+1].num) straightFlush++;
        }
    }
    return straightFlush >= 5 ? true : false;
}
function flush(deck)
{
    let flush = 0;
    for(let i=0;i<7;i++){
        if(deck[i].pae === deck[i+1].pae) flush++;
    }
    return flush >= 5 ? true : false;
}
function straight(deck)
{
    let straight = 0;
    for(let i=0;i<7;i++){
        if(deck[i].num+1 === deck[i+1].num) straight++;
    }
    return straight >= 5 ? true : false;
}
function TaF(deck)
{
    let count;
    for(let i=0;i<7;i++){
        if(deck[i].num === deck[i+1].num){
            count++;
        }
    }
    return count >= 4 ? 1 : 2
}
function fair(deck)
{
    let fair = 0;
    for(let i=0;i<7;i++){
        if(deck[i].num === deck[i].num){
            fair++;
            i+=2;
        }
    }
    if(fair===1) return 1;
    else if(fair===2) return 2;
}
function checkJokbo(deck)
{
    const r = royal(deck);
    const ssf = sf(deck);
    const ff = flush(deck);
    const st = straight(deck);
    const taf = TaF(deck);
    const fff = fair(deck);

    if(r) return 'royal';
    else if(ssf) return 'sf';
    else if(ff) return 'flush';
    else if(st) return 'st';
    else if(taf === 1) return 'fc';
    else if(taf === 2) return 'toak';
    else if(fff === 1) return 'of';
    else if(fff === 2) return 'tf';
}

io.sockets.on('connection', (socket)=>{
    console.log('connected');   

    socket.on('disconnect', ()=>{
        console.log('disconnect');
        for(let i=0;i<3;i++){
            for(let j=0;j<2;j++){
                if(currentUser[i][j] === socket){
                    count[i] -= 1;
                }
            }
        }
    })

    socket.on('join', (num, name) => {
        for(let i=0;i<2;i++){
            i === 0 ? role[num][i] = 'smallBlind' : role[num][i] = 'bigBlind';
        }    
        if(count[num]<2){
            socket.join(room[num], ()=>{
                console.log(`${name} join a ${room[num]}`);
            });
            for(let i=0;i<2;i++){
                if(currentUser[num][i] !== null) currentUser[num][i] = socket;
            }
            count[num] += 1;
            console.log(count[num])
            io.to(room[num]).emit('onConnect', `${name} 님이 입장했습니다.`, count[num]);
        }
        else{
            socket.emit('onConnect', '실패', count[num]);
        }
    });

    socket.on('leave', (num ,name) => {
        socket.leave(room[num]);
        console.log(`${name} leave ${room[num]}`);
        if(count[num]>=0) count[num] -= 1;
        socket.emit('getout');
        io.to(room[num]).emit('onLeave', `${name} 님이 방에서 나가셨습니다.`, count[num]);
    });

    socket.on('setRole', (room)=>{
        let num = Math.round(Math.random());
        if(role[room][num] !== 0){
            socket.emit('role', role[room][num]);
        }
        else{
            if(num === 1) socket.emit('role', role[room][num-1]);
            else socket.emit('role', role[room][num+1]);
        }
        role[room][num] = 0;
    })

    socket.on('sendMsg', (num, name, msg)=>{
        console.log(`${name} sended ${msg}`)
        io.to(room[num]).emit('send', name, msg);
    })

    socket.on('cards', (data, num)=>{
        console.log(data);
        io.to(room[num]).emit('otherCards', data);
    })

    socket.on('shareCards', (num, roomNum)=>{
        for(let i=1;i<=num;i++){
            shareCards[num][i] = Math.round(Math.random()*52)+1;
        }
        console.log(shareCards[num]);
        io.to(room[roomNum]).emit('shareCards', shareCards[num]);
    })

    socket.on('panMoney', (data, num)=>{
        io.to(room[num]).emit('panMoney', data);
    })

    socket.on('smallbet', (data, num)=>{
        io.to(room[num]).emit('smallbet', data);
    })

    socket.on('sequence', (data, num)=>{
        io.to(room[num]).emit('sequence', data);
    })

    socket.on('die', (num, role)=>{
        io.to(room[num]).emit('die', role);
    })

    socket.on('win', (num, role)=>{
        io.to(room[num]).emit('win', role);
    })

    socket.on('showdown', (cards, num, role)=>{
        let deck;
        console.log(cards);
        if(role === 'smallBlind'){
            for(let i=0;i<7;i++){
                smallDeck[num][i] = cards[i];
            }
            deck = smallDeck;
        }
        else{
            for(let i=0;i<7;i++){
                bigDeck[num][i] = cards[i];
            }
            deck = bigDeck;
        }   
        const jokbo = checkJokbo(deck);
        role === 'smallBlind' ? socket.emit('showdown', 'smallBlind', jokbo) : socket.emit('showdown', 'bigBlind', jokbo);
    })

    socket.on('otherDeck', (num, data)=>{
        data === 'smallBlind' ? socket.emit('otherDeck', bigDeck[num]) : socket.emit('otherDeck', smallDeck[num]);
    })
});

app.use(express.static(path.join(__dirname, '../holdemview/build')));
app.get('/', (req, res)=>{
    res.sendFile(__dirname, '../holdemview/build/index.html');
});

server.listen(3000, ()=>{
    console.log('express running on 3000');
})