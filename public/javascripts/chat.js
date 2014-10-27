// window.ChatSpace = {};

var Chat = function (socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function (messageText) {
  this.socket.emit('message', messageText);
};