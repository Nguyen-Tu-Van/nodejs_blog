const courseRouter = require('./course');

function route(app) {
    app.use('/', courseRouter);
}

module.exports = route;
