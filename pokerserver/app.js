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
let people = [];

for(let i=0;i<3;i++){
    let user = []
    people[i] = user;
}

io.sockets.on('connection', (socket)=>{
    console.log('connected');   

    socket.on('disconnect', ()=>{
        console.log('disconnect');
    })

    socket.on('join', (num, name) => {
        if(count[num]<2){
            socket.join(room[num], ()=>{
                console.log(`${name} join a ${room[num]}`);
            });
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
        io.to(room[num]).emit('onLeave', `${name} 님이 방에서 나가셨습니다.`, count[num]);
    });

    socket.on('sendMsg', (num, name, msg)=>{
        console.log(`${name} sended ${msg}`)
        io.to(room[num]).emit('send', name, msg);
    })
});

app.use(express.static(path.join(__dirname, '../pokerview/build')));
app.get('/', (req, res)=>{
    res.sendFile(__dirname, '../pokerview/build/index.html');
});

server.listen(3000, ()=>{
    console.log('express running on 3000');
})