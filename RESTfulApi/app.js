const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const port = process.env.PORT || 8000;


// connect to a databases in this folder made from webcrawl
// using puppeteer

const db = new sqlite3.Database("stocks", sqlite3.OPEN_READONLY, (err)=>{
	if(err){
		console.log(err)
	}
	console.log("Connected to Database")
	return db;
});

// pushing all the records for the get request
app.get("/api/stocks", (req, res)=>{
	

		let stocks = [];
		let query = "SELECT * FROM stocks_prices";
		db.all(query,(err, rows)=>{
			if(err){
				console.log("Didn't find table");
				res.status(404).send("Stocks not found");
			}
		
			rows.forEach((row)=>{
				stocks.push({row});	
			});
		// must render here or stocks arr gets cleared
		// be careful 
		res.json([stocks]);
	});

	});
app.get("/api/stocks/:id", (req,res)=>{
	let stockId = req.params.id;
	let query = "SELECT * FROM stocks_prices WHERE symbols = ?"
	let stocks = [];
	db.all(query,[stockId],(err, rows)=>{
		if(err){
			res.status(404).send("Stocks not found");
		}
		rows.forEach((row)=>{
			stocks.push({row})
			console.log(row)
		});
		res.json([stocks])
	});
});

	











app.listen(port, ()=>{
	console.log(`Listen on port ${port}....`)
});


















