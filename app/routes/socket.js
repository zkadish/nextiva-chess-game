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
      await Socket._handleRoom(res.room);
      curIo.emit('rooms', await Rooms.getAllList());
    }

    !res.room || delete res.room;

    callback(res);
  }


  static async connectToGame(data, callback) {
    const res = await Rooms.connectToGame(data);

    if (!res.err) {
      await Socket._handleRoom(res.room);
      curIo.emit('rooms', await Rooms.getAllList());
    }

    callback({
      err: res.err,
      status: res.status,
    });

    curIo.sockets.in(res.room).emit('room.connect', res.data);
  }


  static async connectToGameVisitor(data, callback) {
    const res = await Rooms.connectToGameVisitor(data);

    if (res.err) {
      await Socket._handleRoom(res.room);
    }

    !res.room || delete res.room;

    callback(res);
  }


  static async _handleRoom(room) {
    curSocket.join(room);
    curIo.sockets.in(room).on('room.move', async (data, callback) => {
      console.log(data)
      // const res = await Game.moveFigure(data);
      //
      // if (!res.err) {
      //   curIo.sockets.in(room).emit('room.move', Object.assign(data, res.data));
      // }
      //
      // !res.data || delete res.data;
      //
      // callback(res);
    });
  }

}


module.exports = (io) => {
  curIo = io;

  router.route('/socket').post(async (req, res) => {
    const per = await User.permissions(req, res);
    if (!per) return;

    io.once('connection', async (socket) => {
      curSocket = socket;

      socket.emit('rooms', await Rooms.getAllList());
      socket.on('room.create', await Socket.createRoom);
      socket.on('room.connect', await Socket.connectToGame);
      socket.on('room.connect-visitor', await Socket.connectToGameVisitor);

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    res.json();
  });

  return router;
};