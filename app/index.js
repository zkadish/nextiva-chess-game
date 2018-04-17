var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, '0.0.0.0');


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world 32' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});








// const WebSocket = require('ws')

// const wss = new WebSocket.Server({ port: 8989 })

// const users = []

// const broadcast = (data, ws) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN && client !== ws) {
//       client.send(JSON.stringify(data))
//     }
//   })
// }

// wss.on('connection', (ws) => {
//   let index
//   ws.on('message', (message) => {
//     const data = JSON.parse(message)
//     console.log(message)
//     switch (data.type) {
//       case 'ADD_USER': {
//         index = users.length
//         users.push({ name: data.name, id: index + 1 })
//         ws.send(JSON.stringify({
//           type: 'USERS_LIST',
//           users
//         }))
//         broadcast({
//           type: 'USERS_LIST',
//           users
//         }, ws)
//         break
//       }
//       case 'ADD_MESSAGE':
//         broadcast({
//           type: 'ADD_MESSAGE',
//           message: data.message,
//           author: data.author
//         }, ws)
//         break
//       default:
//         break
//     }
//   })

//   ws.on('close', () => {
//     users.splice(index, 1)
//     broadcast({
//       type: 'USERS_LIST',
//       users
//     }, ws)
//   })
// })
