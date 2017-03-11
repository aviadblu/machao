let express  = require('express');
let app      = express();
let port  	 = process.env.PORT || 8787;

let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

require('./routes.js')(app);

app.listen(port);
console.log("App listening on port " + port);