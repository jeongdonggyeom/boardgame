const express = require('express');
const http = require('http');
const path = require("path");
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
const room = ['room1', 'room2', 'room3'];
let count = [0, 0, 0];
let cards = [];
let shareCards = [];
let currentUser = [];
const role = ['smallBlind', 'bigBlind'];
for(let i=1;i<=52;i++){
    cards[i] = i;
}
for(let i=0;i<3;i++){
    let arr = [];
    currentUser[i] = arr;
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

    socket.on('setRole', ()=>{
        let num = Math.round(Math.random());
        if(role[num] !== 0){
            socket.emit('role', role[num]);
        }
        else{
            if(num === 1) socket.emit('role', role[num-1]);
            else socket.emit('role', role[num+1]);
        }
        role[num] = 0;
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
            shareCards[i] = Math.round(Math.random()*52)+1;
        }
        io.to(room[roomNum]).emit('shareCards', shareCards);
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
});

app.use(express.static(path.join(__dirname, '../holdemview/build')));
app.get('/', (req, res)=>{
    res.sendFile(__dirname, '../holdemview/build/index.html');
});

server.listen(3000, ()=>{
    console.log('express running on 3000');
})