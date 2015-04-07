var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("../lowes-assessment"));
app.listen(5000);

console.log('Server running at http://127.0.0.1:5000/');