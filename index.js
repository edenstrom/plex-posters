require('babel/register')({});

var server = require('./server.jsx');

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
  console.log('Listening on port', PORT);
});
