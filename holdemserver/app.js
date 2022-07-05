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
const sb = ['smallBlind', 'bigBlind'];
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
    currentUser[i] = arr;
    shareCards[i] = arr;
    smallDeck[i] = arr;
    bigDeck[i] = arr;
    role[i] = sb;
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
    if(count >= 4) return 'four';
    else if(count>=3) return 'three';
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
    if(fair===1) return 'onefair';
    else if(fair===2) return 'twofair';
}
function checkJokbo(deck)
{
    let three;
    let two;
    const r = royal(deck);
    const ssf = sf(deck);
    const ff = flush(deck);
    const st = straight(deck);
    const taf = TaF(deck);
    const fff = fair(deck);

    if(r) return 'royal';
    else if(ssf) return 'sf';
    else if(taf === 'four') return 'four';
    else if(ff) return 'flush';
    else if(st) return 'st';
    else if(taf === 'three') three = true;
    else if(fff === 'twofair') two = true;
    else if(fff === 'onefair') return 'onefair';

    if(three && two) return 'full';
    else if(three) return 'three';
    else if(two) return 'two';

    if(r === false && ssf === false && taf !== 'four' && taf !== 'three' && ff === false && st === false && fff !== 'twofair' && fff != 'onefair')
        return 'high';
}

io.sockets.on('connection', (socket)=>{
    console.log('connected');   

    socket.on('disconnect', ()=>{
        console.log('disconnect');
        for(let i=0;i<3;i++){
            for(let j=0;j<2;j++){
                if(currentUser[i][j] === socket){
                    count[i] -= 1;
                    currentUser[i][j] === null;
                }
            }
        }
    });

    socket.on('join', (num, name) => { 
        if(count[num]<2){
            socket.join(room[num], ()=>{
                console.log(`${name} join a ${room[num]}`);
            });
            currentUser[num][count[num]] = socket;
            count[num] += 1;
            console.log(count[num])
            io.to(room[num]).emit('onConnect', `${name} 님이 입장했습니다.`, count[num]);
        }
        else{
            socket.emit('onConnect', '실패', count[num]);
        }
    });

    socket.on('leave', (num, name, socket) => {
        socket.leave(room[num]);
        console.log(`${name} leave ${room[num]}`);
        if(count[num]>0) count[num] -= 1;
        role[num] = sb;
        for(let i=0;i<2;i++){
            if(currentUser[num][i] === socket){
                io.sockets.socket(socket).emit('getout');
            }
        }
        io.to(room[num]).emit('onLeave', `${name} 님이 방에서 나가셨습니다.`, count[num]);
    });

    socket.on('setRole', (room)=>{
        let num = Math.round(Math.random());
        if(role[room][num] !== 0){
            socket.emit('role', role[room][num])
        }
        else{
            if(num === 1) {
                socket.emit('role', role[room][num-1])
            } 
            else {
                socket.emit('role', role[room][num+1])
            }
        }
        role[room][num] = 0;
    });

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
            let n = Math.round(Math.random()*52)+1;
            shareCards[roomNum][i] = n;
        }
        shareCards[roomNum][0] = null;
        console.log(shareCards[roomNum]);
        io.to(room[roomNum]).emit('shareCards', shareCards[roomNum]);
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
        if(role === 'smaillBlind') io.to(room[num]).emit('win', 'bigBlind');
        else io.to(room[num]).emit('win', 'smallBlind');
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
        let weight;
        if(jokbo === 'royal') weight = 1;
        else if(jokbo === 'sf') weight = 2;
        else if(jokbo === 'four') weight = 3;
        else if(jokbo === 'full') weight = 4;
        else if(jokbo === 'flush') weight = 5;
        else if(jokbo === 'st') weight = 6;
        else if(jokbo === 'three') weight = 7;
        else if(jokbo === 'two') weight = 8;
        else if(jokbo === 'one') weight = 9;
        else if(jokbo === 'hight') weight = 10;
        
        role === 'smallBlind' ? socket.emit('showdown', 'smallBlind', jokbo, weight) : socket.emit('showdown', 'bigBlind', jokbo, weight);
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