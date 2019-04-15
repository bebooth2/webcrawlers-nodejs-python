const puppeteer = require('puppeteer');
const {TimeoutError} = require("puppeteer/Errors");
const sqlite3 = require("sqlite3").verbose();

// connect to database and create table
var db = new sqlite3.Database('.stocks');
db.serialize(function(){
db.run("CREATE TABLE stocks_prices (prices TEXT, symbols TEXT, time TEXT)");

 })
// function to get a time stamp
function time(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var arr = [hours, minutes, seconds].map((num)=>{
    return num<10 ? "0" + num : String(num)
  });
  return arr[0] + ":"+ arr[1]+ ":"+ arr[2];
}


var count = 0;

async function get_stocks() {

  const browser = await puppeteer.launch({headless: true});

  const page = await browser.newPage();
 
  try{
  await page.goto('https://www.marketwatch.com/investing/index/djia');
  
  }catch(e){

      if(e instanceof TimeoutError)
    {
      console.log("TimedOut")
    }
  }

  const stocks =  await page.evaluate(()=>
  Array.from(document.querySelectorAll("tr.index")).map(node =>({
      prices: node.querySelector("td.price").innerText,
      symbols: node.querySelector("td.symbol").innerText

     }
        
  )));
  	for (let item of stocks){
      var time1 = time();
      db.run("INSERT INTO stocks_prices (prices, symbols, time) VALUES(?,?,?)",(item['prices'], item['symbols'], time1))
      console.log(item["prices"], item["symbols"], time1)
    }

{

}
if(count>100){
  clearInterval(myTimer)
}
count+=1;
  
  await browser.close();
};


var myTimer = setInterval(get_stocks, 20000);







