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
        let jokbo;
        console.log(cards);
        if(role === 'smallBlind'){
            for(let i=0;i<7;i++){
                smallDeck[num][i] = cards[i];
            }
        }
        else{
            for(let i=0;i<7;i++){
                bigDeck[num][i] = cards[i];
            }
        }
        role === 'smallBlind' ? socket.emit('showdown', bigDeck[num]) : socket.emit('showdown', smallDeck[num]);
    })
});

app.use(express.static(path.join(__dirname, '../holdemview/build')));
app.get('/', (req, res)=>{
    res.sendFile(__dirname, '../holdemview/build/index.html');
});

server.listen(3000, ()=>{
    console.log('express running on 3000');
})