
function createChat (server) {
  var socketio = require('socket.io');
  var guestnumber = 1;
  var screennames = {};

  var io = socketio(server);

  io.on('connection', function (socket) {
    socket.on('screennameChangeResult', function (result) {
      if (result.success) {
        socketIdString = socket.id.toString();
        screennames.extend({ socketIdString: guestScreenname });
      }
    });

    socket.on('message', function (messageText) {
      finalMessageText = screennames[socket.id] + ": " + messageText;
      io.emit('message', finalMessageText);
    });

    socket.on('screennameChangeRequest', function (screennameRequest) {
      var successful = true;

      screennames.forEach(function (key, val) {
        if (screennameRequest === val) {
          socket.emit('screennameChangeResult', {
            success: false,
            message: 'Screenname already taken'
          });

          successful = false;
        }
      });

      if (successful) {
        socket.emit('screennameChangeResult', {
          success: true
        });
      }
    });

    guestnumber++;
    guestScreenname = 'guest_' + guestnumber.toString();
    socket.emit('screennameChangeRequest', guestScreenname);
  });
};

exports.createChat = createChat;