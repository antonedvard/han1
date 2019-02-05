const han1WebServer = require('./han1-webserver');
const io = require('socket.io')(han1WebServer);

if (process.cfg.firstStart) {
  const initSetupSocket = io.of('/');
  module.exports.initSetupSocket = initSetupSocket;
} else {

  const mainSocket = io.of('/main');
  const settingsSocket = io.of('/settings');
  const dbgSocket = io.of('/debug');
  const errorSocket = io.of('/error');

  mainSocket.on('connection', function (socket) {
    if (process.cfg.debug) {
      console.log('A user connected to main');
      socket.on('disconnect', function () {
        console.log('A user disconnected from main')
      });
    }
  });


  settingsSocket.on('connection', (socket) => {
    if (process.cfg.debug) {
      console.log('A user connected to settings');
      socket.on('disconnect', function () {
        console.log('A user disconnected from settings')
      });
    }
  })

  errorSocket.on('connection', (socket) => {
    if (process.cfg.debug) {
      console.log('A user connected to error');
      socket.on('disconnect', function () {
        console.log('A user disconnected from error')
      });
    }
  })


  if (process.cfg.debug) {
    dbgSocket.on('connection', (socket) => {
      if (process.cfg.debug) {
        console.log('A user connected to debug');
        socket.on('disconnect', function () {
          console.log('A user disconnected from debug')
        });
      }
    })
  }



  module.exports = {
    mainSocket,
    settingsSocket,
    dbgSocket,
    errorSocket
  }
}
