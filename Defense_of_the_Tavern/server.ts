import * as express from 'express';
import * as http from 'http';
import * as sio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = sio(server);

const port: (string | number) = process.env.PORT || 3000;

const maxPlayer = 2;
let curPlayer: number = 0;

server.listen(port, function () {
    console.log('Server is listening on port %d', port);
})

app.use(express.static(__dirname));

app.use(express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

io.on('connection',function(socket){
    socket.on('newPlayer',function(){
        if(curPlayer < maxPlayer){
            const player: (number|number) = randomInt(0,100) || randomInt(0,100);
            socket.broadcast.emit('newPlayer',player);
            curPlayer++;

            socket.on('disconnect',function(){
                io.emit('remove');
            });
        }
    });
});

function randomInt (low:number, high:number) {
    return Math.floor(Math.random() * (high - low) + low);
}

