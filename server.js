const WebSocket = require('ws');
const discord = require('./discord');

const wss = new WebSocket.Server({
  port: 6969
});

let lastSong = null;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(title) {
    if (!title || lastSong === title || title === "YouTube") return;
    lastSong = title;
    discord.send(title);
  });
  ws.send('Connected!');
});