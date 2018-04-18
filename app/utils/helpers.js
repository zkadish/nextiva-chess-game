module.exports = {
  getRoomStr: (id) => `room.id-${id}`,
  getUnixTimeNow: () => Math.round((new Date()).getTime() / 1000),
};