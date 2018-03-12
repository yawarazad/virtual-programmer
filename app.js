var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var app = express()

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//set static path
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res){
   res.render('index')
});

app.post("/webhook", function(req, res) {
  	var speech =
	    req.body.result &&
	    req.body.result.parameters &&
	    req.body.result.parameters.echoText
	      ? req.body.result.parameters.echoText
	      : "Some Error Has Occured";
	
	speech = speech + "From Backend";

	return res.json({
	    speech: speech,
	    displayText: speech,
	    source: "Backend of the app"
	})
})

var port = process.env.PORT || 8000
app.listen(port, function() {
	console.log("Server Started on port "+port);
})