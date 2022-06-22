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
let count = 0;

io.sockets.on('connection', (socket)=>{
    console.log('connected');   

    if(count===2){
        socket.emit('start');
    }

    socket.on('disconnect', ()=>{
        console.log('disconnect');
        count-=1;
    })

    socket.on('join', (num, name) => {
        socket.join(room[num], ()=>{
            console.log(`${name} join a ${room[num]}`);
        });
        count+=1;
        console.log(count)
        io.to(room[num]).emit('onConnect', `${name} 님이 입장했습니다.`, count);
    });

    socket.on('leave', (num ,name) => {
        socket.leave(room[num]);
        console.log(`${name} leave ${room[num]}`);
        count-=1;
        io.to(room[num]).emit('onLeave', `${name} 님이 방에서 나가셨습니다.`, count);
    });

    socket.on('sendMsg', (num, name, msg)=>{
        a = num;    
        console.log(`${name} sended ${msg}`)
        io.to(room[a]).emit('send', name, msg);
    })
});

app.use(express.static(path.join(__dirname, '../pokerview/build')));
app.get('/', (req, res)=>{
    res.sendFile(__dirname, '../pokerview/build/index.html');
});

server.listen(3000, ()=>{
    console.log('express running on 3000');
})
