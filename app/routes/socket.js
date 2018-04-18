const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const Game = require('../controllers/Game');
const Rooms = require('../controllers/Rooms');


let curIo;
let curSocket;


class Socket {

  static async createRoom(data, callback) {
    const res = await Rooms.createGame(data);

    if (!res.err) {
      await Socket._handleRoom(res.room, true);
      curIo.emit('rooms', Rooms.getAllList());
    }

    callback(res);
  }


  static async connectToGame(data, callback) {
    const res = await Rooms.connectToGame(data);

    if (!res.err) {
      await Socket._handleRoom(res.room);
      curIo.emit('rooms', Rooms.getAllList());
    }

    callback(res);
  }


  static async connectToGameVisitor(data, callback) {
    const res = await Rooms.connectToGameVisitor(data);

    if (res.err) {
      curSocket.join(res.room);
      curIo.sockets.in(res.room).on('room', console.log);
    }

    callback(res);
  }



  static async _handleRoom(room, isCreate = false) {
    curSocket.join(room);
    curIo.sockets.in(room)
      .on('room.move', async (data) => {
        const res = await Game.moveFigure(data);

        if (!res.err) {
          curIo.sockets.in(room).emit('room.move', Object.assign(data, res.data));
        }
      })
      .on('room.give-up', async () => {

      });

    if (!isCreate) {
      curIo.sockets.in(room)
        .emit('room.connect', {

        });
    }
  }

}




module.exports = (io) => {
  curIo = io;

  router.route('/socket').post(async (req, res) => {
    const per = await User.permissions(req, res);
    if (!per) return;

    io.on('connection', (socket) => {
      curSocket = socket;

      socket.emit('rooms', Rooms.getAllList());
      socket.on('test', (data) => console.log(data));

      socket.on('room.create', Socket.createRoom);
      socket.on('room.connect', Socket.connectToGame);
      socket.on('room.connect-visitor', Socket.connectToGameVisitor);

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  });

  return router;
};