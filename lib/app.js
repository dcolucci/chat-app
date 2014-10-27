var http = require('http');
var statik = require('node-static');
var cs = require('./chat_server');

var file = new statik.Server('./public');

var server = http.createServer(function (req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
});

server.listen(8000);

cs.createChat(server);