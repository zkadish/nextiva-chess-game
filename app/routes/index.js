
const userRoutes = require('./user');

const routes = {
  '/user': userRoutes,
};



module.exports = (app, versionAPI) => {
  for (let key in routes) {
    app.use(versionAPI + key, routes[key]);
  }
};