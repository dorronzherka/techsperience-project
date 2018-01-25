const express = require('express');

//init app
const app = express();

//routes
app.get('/',(req,res) =>{
	res.send("Index page");
});

app.listen(3000,() => {
	console.log("Web application started http://localhost:3000");
})