from requests_html import HTML, AsyncHTMLSession
import csv
import time, datetime
import sqlite3

csv_file = open("yahoo_finacial.csv", "w")
csv_writer = csv.writer(csv_file)

#csv.writer.writerow([""])

asession = AsyncHTMLSession()
async def get_snp():
	r_sNp = await asession.get("https://finance.yahoo.com/quote/%5EGSPC?p=^GSPC")
	ts = time.time()
	time1 = datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")
	return r_sNp.html.xpath('//*[@id="quote-header-info"]/div[3]/div/div/span[1]')[0].text, "S&P", time1

async def get_dow():
	r_dow = await asession.get("https://finance.yahoo.com/quote/%5EDJI?p=^DJI")
	ts = time.time()
	time1 = datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")
	return r_dow.html.xpath('//*[@id="quote-header-info"]/div[3]/div/div/span[1]')[0].text, "Dow", time1

async def get_nasdaq():
	r_nasdaq = await asession.get("https://finance.yahoo.com/quote/%5EIXIC?p=^IXIC")
	ts = time.time()
	time1 = datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")
	return r_nasdaq.html.xpath('//*[@id="quote-header-info"]/div[3]/div/div/span[1]')[0].text, "Nasdaq", time1

async def get_crude():
	r_crude= await asession.get("https://finance.yahoo.com/quote/CL=F?p=CL=F")
	ts = time.time()
	time1 = datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")
	return r_crude.html.xpath('//*[@id="quote-header-info"]/div[3]/div/div/span[1]')[0].text, "Crude", time1

async def get_gold():
	r_gold = await asession.get("https://finance.yahoo.com/quote/GC=F?p=GC=F")
	ts = time.time()
	time1 = datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")
	return r_gold.html.xpath('//*[@id="quote-header-info"]/div[3]/div/div/span[1]')[0].text, "Gold", time1

conn = sqlite3.connect("portfoliostocks.db")
print(type(conn))
cur = conn.cursor()
# cur.execute("""CREATE TABLE stocks_prices(
# 			stock_name text,
# 			price REAL,
# 			time1 text)""")


for i in range(100):

	results = asession.run(get_snp, get_dow, get_nasdaq, get_crude, get_gold)
	for result in results:
		conn.execute("INSERT INTO stocks_prices VALUES (?,?,?)", (result[1], result[0], result[2]))
		print(result[1], result[0], result[2])
	time.sleep(20)
conn.commit()
conn.close();



