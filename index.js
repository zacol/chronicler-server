const app = require('./lib/boot');
const debug = require('debug')('chronicler');
const http = require('http');

// Launch server
http.createServer(app).listen(app.get('port'), () => {
  debug('Application started on port %d', app.get('port'));
});
