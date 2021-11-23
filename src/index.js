const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
// const route = require('color-convert/route');
const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));
// body
    app.use(
  express.urlencoded({
      extended: true,
  }),
);
//Template engine
app.engine('hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
