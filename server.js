const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  const error = Object.create(err);
  console.log(error.name, error.message);
  console.log('UNCAUGHT EXCEPTION');
  console.log('SHUTTING DOWN');
  console.log('💥💥💥💥 DEAD');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connexion success !'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  const fullMessage = err.message;
  const errmsgStart = 0; // Start at the beginnning
  const newline = /\n/; // new line character
  const errmsgStop = fullMessage.search(newline); // Find new line
  const errmsgLen = errmsgStop - errmsgStart;
  const errorText = fullMessage.substr(errmsgStart, errmsgLen);
  console.log(`💥 Error Name : ${err.name}`);
  console.log(`💥 Error Text : ${errorText}`);
  console.log('💥 UNHANDLED REJECTION! Shutting down!');
  server.close(() => {
    console.log('💥 DEAD');
    process.exit(1);
  });
});
