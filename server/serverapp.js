var express =  require('express');
var app = express();
var bodyParser = require('body-parser');

var index = require('./routes/index');
var employees = require('./routes/employees');
var salaries = require('./routes/salaries');

//magic
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/employees', employees);
app.use('/salaries', salaries);
app.use('/', index);

//port
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
