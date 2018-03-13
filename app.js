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
  	var speech = req.body.queryResult.queryText;
  	console.log(JSON.stringify(req.body, 0, 2));

	return res.json({
	    
		  fulfillmentText: speech,
		  source: "My Source"

		  // fulfillmentMessages: [
		  // 	{
		  // 		image: {
		  // 			imageUri: "https://avatars1.githubusercontent.com/u/17217118?s=460&v=4"
		  // 		}
		  // 	}
		  // ]

	})
})

var port = process.env.PORT || 8000
app.listen(port, function() {
	console.log("Server Started on port "+port);
})