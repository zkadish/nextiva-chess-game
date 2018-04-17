
const userRoutes = require('./user');
const socketRoutes = require('./socket');

const routes = {
  '/user': userRoutes,
  'socket': socketRoutes,
};



module.exports = (app, socket, versionAPI) => {
  for (let key in routes) {
    if (!key.startsWith('/')) {
      app.use(versionAPI, routes[key](socket));
    } else {
      app.use(versionAPI + key, routes[key]);
    }
  }
};