const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const Rooms = require('../controllers/Rooms');


let curIo;
let curSocket;


class Socket {

  static async createRoom(data, callback) {
    const res = await Rooms.createGame(data);
    callback(res);

    if (!res.err) {
      curIo.emit('/rooms', Rooms.getAllList());
    }
  }


  static async connectToGame(data) {
    const res = await Rooms.connectToGame(data);
    curSocket.emit('/room/connect', res);

    if (!res.err) {
      curIo.emit('/rooms', Rooms.getAllList());
    }
  }


  static async connectToGameVisitor(data) {
    const res = await Rooms.connectToGameVisitor(data);
    curSocket.emit('/room/connect-visitor', res);
  }


}




module.exports = (io) => {
  curIo = io;

  router.route('/socket').post(async (req, res) => {
    const per = await User.permissions(req, res);
    if (!per) return;

    io.on('connection', (socket) => {
      curSocket = socket;

      socket.emit('/rooms', Rooms.getAllList());

      socket.on('/room/create', Socket.createRoom);
      socket.on('/room/connect', Socket.connectToGame);
      socket.on('/room/connect-visitor', Socket.connectToGameVisitor);

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  });

  return router;
};