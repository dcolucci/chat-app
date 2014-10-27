// window.ChatSpace = {};

var Chat = function (socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function (messageText) {
  this.socket.emit('message', messageText);
};

Chat.prototype.processCommand = function (command) {
  var args = Array.prototype.slice.call(arguments, 1);

  switch (command) {
    case "sn":
      this.socket.emit('screennameChangeRequest', args[0]);
    default:
      this.socket.emit('message', 'invalid command');
  }
}