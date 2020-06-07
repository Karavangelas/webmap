import pathlib
import json
from pymongo import MongoClient

# get file, temp hardcoded
p =  pathlib.Path("region_pie_chart.json")

if not p.exists():
    print("File DNE")

f = json.loads(p.read_text())
client = MongoClient("mongodb://localhost:27017")
db = client.gisaid

for country, ism in f.items():
    temp = {"country": country, country: ism}
    db.regionPieChart.insert_one(temp)
