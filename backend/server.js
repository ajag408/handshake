const express = require('express');
const createError = require('createerror');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');


const mysql = require('mysql');
// var multer = require('multer');
// const path = require('path')
// const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
// const upload = multer({
//   dest: UPLOAD_PATH,
//   limits: {fileSize: 1000000, files: 5}
// })


const mc = mysql.createConnection({
  host: 'fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'pvgt0ikkvj7xf93e',
  password: 'lf71yxojh35mybjz',
  database: 'rqxyzqga475wwky1',
});

mc.connect();





// Express Route
const studentRoute = require('../backend/routes/student.route');
const companyRoute = require('../backend/routes/company.route');
const jobRoute = require('../backend/routes/jobs.route');
const applicationRoute = require('../backend/routes/application.route');
const eventRoute = require('../backend/routes/event.route');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'cmpe_273_secure_string',
  resave: true,
  saveUninitialized: true,
}));

app.use(cors());
// app.use(multer({ dest: "./uploads/"}).single('photo'));


app.use('/students', studentRoute);
app.use('/companies', companyRoute);
app.use('/jobs', jobRoute);
app.use('/applications', applicationRoute);
app.use('/events', eventRoute);

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
