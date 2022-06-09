var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
let session = require('express-session')

var indexRouter = require('./routes/index');
let userRouter = require('./routes/userRouter');

var app = express();
const port = process.env.PORT || 3001;

//************ Listen port ************
app.listen(port, ()=>{
    console.log('Servidor corriendo en http://localhost:3001/');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
    secret: 'aguante el piti vieja!',
    resave: false,
    saveUninitialized: false
}))

app.use('/', indexRouter);
app.use('/users', userRouter);

module.exports = app;
