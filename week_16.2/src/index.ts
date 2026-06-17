import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User{
    socket: WebSocket,
    room :string
}

let allSocket: User[]  = [];
wss.on("connection", (socket: WebSocket)=>{

    socket.on("message", (message)=>{
        const parsedMessage = JSON.parse(message.toString());
        if(parsedMessage.type === "join"){
            console.log("User joined room: ", parsedMessage.payload.roomId);
            allSocket.push({
                socket: socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === "chat"){
            console.log("User want to send a message...");
            const currUserRoom = allSocket.find((user) => user.socket === socket)?.room;
            for(let i=0; i<allSocket.length; i++){
                if(allSocket[i]?.room === currUserRoom){
                    allSocket[i]?.socket.send(parsedMessage.payload.message);
                }
            }
        }
    })
})