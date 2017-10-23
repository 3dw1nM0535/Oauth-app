var express = require('express'); //import express module

var app = express(); //instantiate express object

//Static files Middleware
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/config', express.static(process.cwd() + '/config'));
app.use('/semantic', express.static(process.cwd() + '/semantic'));

//set view Middleware
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//get home route
app.get('/', function (req, res) {
  res.render('home');
});



app.listen(3000, function() {
  console.log('Server running on port 3000');
});
