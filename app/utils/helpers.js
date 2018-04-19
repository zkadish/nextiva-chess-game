
const ROOM_STR = 'room.id-';

module.exports = {
  getRoomStr: (id) => ROOM_STR + id,
  getRoomId: (str) => +str.replace(ROOM_STR, ''),
  getUnixTimeNow: () => Math.round((new Date()).getTime() / 1000),
};