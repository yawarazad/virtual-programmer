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

app.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Hello I am programming bot.";
	var input = "write hello world program for me"
	var input1 = speech.toString().trim();
	
	var output ="<p><s>"+ 
				"#include <stdio.h></s>"+
				"<s>int main()</s>"+
				"<s>{</s>"+
				   "<s>printf('Hello, World!');</s>"+
				   "<s>return 0;</s>"+
				"<s>}</s>"+
				"</s></p>"
	
	if(input == input1) speech = output;
	speech = speech + " | BBY";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "Backend of the app"
  });
});


var port = process.env.PORT || 8000
app.listen(port, function() {
	console.log("Server Started on port "+port);
})