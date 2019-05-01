
var express = require("express");
var app = express();
const port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var sqlite3 = require("sqlite3").verbose();
var stocks=[]
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes to financial canvas and home
app.get("/",(req,res)=>{
	res.render("home")
});

app.get("/financial", (req, res)=>{
	res.render("financial")
});

app.get("/canvas", (req, res)=>{
	res.render("canvas")
});

app.get("/:id", (req,res)=>{
	  res.json({stocks});});
	

app.post("/financial", (req, res)=>{
	let stockId = req.body.stock;
	console.log(stockId)
	stocks = [];
	getdatabase("portfoliostocks.db", (db)=>{
			getdata(db, stockId, ()=>{
				console.log(stocks[0])
				res.render("graphs", {stockVar: stocks})});
	})});

	
app.get("*", (req,res)=>{
	res.render('home')
});

function getdatabase(database, callback){
	db = new sqlite3.Database(database, sqlite3.OPEN_READONLY,(err)=>{
		if(err){
			console.error(err.message);
		}
		console.log("Connected to the database")
	});
	callback(db)
}
function getdata(db, stockId, callback){
	let query = "SELECT  *  FROM stocks_prices WHERE stock_name = ?";
	db.all(query, [stockId], (err, rows)=>{
		if(err){
			res.status(404).send("Stocks not found");
		}
		rows.forEach((row)=>{
			stocks.push(row)
		});
		
	callback({stocks});
	});
	db.close((err)=>{
		if(err){
			console.error(err.message);
		}
		console.log("Closed the database connection")
	});
};


app.listen(port, ()=>{
	console.log(`Listening to port ${port}.....`)
});