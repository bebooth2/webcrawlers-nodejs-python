
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
	getdatabase("portfoliostocks.db")
		.then(db => getdata(db, stockId))
		.then(()=>{
				
				res.render("graphs", {stockVar: stocks})
			})
		.catch(err => console.log("Error"))
	});
/* Async and Await version
app.post("/financial", (req, res)=>{
	let stockId = req.body.stock;
	console.log(stockId)
	stocks = [];
	async function getGraphs(){
	    try{
		const db = await getdatabase("portfoliostocks.db");
		const data = await getdata(db, stockId);
		res.render("graphs", {stockVar: stocks});
		}
	   catch(err){
                console.log(err.message)
		}}
	getGraphs();
	
});
*/

	
app.get("*", (req,res)=>{
	res.render('home')
});

function getdatabase(database){
	return new Promise((resolve, reject)=>{
		db = new sqlite3.Database(database, sqlite3.OPEN_READONLY,(err)=>{
		if(err){
			console.error("Error");
			reject(console.log(err.message))
		}
		console.log("Connected to the database")
		
	});	
	resolve(db)
});};
function getdata(db, stockId){
	return new Promise((resolve,reject)=>{
		console.log(stockId)
		let query = "SELECT  *  FROM stocks_prices WHERE stock_name = ?";
		db.all(query, [stockId], (err, rows)=>{
			if(err){
				res.status(404).send("Stocks not found");
				reject(console.log("Stocks not found"))
			}
			rows.forEach((row)=>{
				stocks.push(row)
				
			});
			console.log(stocks)
			resolve({stocks})
		});
		db.close((err)=>{
		if(err){
			console.error(err.message);
			reject(console.log("Stocks not found"))
		}
		console.log("Closed the database connection")
	});
		
		
	});
	
};


app.listen(port, ()=>{
	console.log(`Listening to port ${port}.....`)
});
