const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('morgan');
const { limiter } = require('./rate-limiter')

dotenv.config();
const app = express();

// const { redisClient } = require('./redis')
const indexRouter = require('./app/index');

// view engine setup
app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + 'public'));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(limiter)
app.use('/v1/api', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err, 'err'));

app.use(function (err, req, res,_next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
  
   // render the error page
   res.status(err.status || 500);
   res.render('error');
});

// redisClient.connect()

// redisClient.on('error', err => {
//   console.error(err);
// });
// redisClient.on('connect', ()=> {
//   console.error('Connected to Redis');
// });
  
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server now running on port ${PORT}`)
})

module.exports = app;