import pathlib
import json
from pymongo import MongoClient

# get file, temp hardcoded
p =  pathlib.Path("region_time_series.json")

if not p.exists():
    print("File DNE")

f = json.loads(p.read_text())
client = MongoClient("mongodb://localhost:27017")
db = client.gisaid

for time, ism in f.items():
    temp = {"date": time, time: ism}
    db.regionTimeSeries.insert_one(temp)
