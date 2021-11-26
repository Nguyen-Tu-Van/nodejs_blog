const path = require('path');
const methodOverride = require('method-override');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const sortMiddleware = require('./app/middlewares/SortMiddleware');
// const route = require('color-convert/route');
const route = require('./routes');
const db = require('./config/db');
//connect db
db.connect();
app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));
// body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(methodOverride('_method'));

//middleware
app.use(sortMiddleware);

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helper/handlerbars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
