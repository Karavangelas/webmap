import pathlib
import json
from pymongo import MongoClient
import argparse

def main():
    parser = argparse.ArgumentParser(description="Import region time series data to MongoDB")
    parser.add_argument("--file", dest="file", help="Path to region_time_series.json", required=True)
    args = parser.parse_args()
    # get file, temp hardcoded
    p =  pathlib.Path(args.file)

    if not p.exists():
        print("File DNE")
        return 1
    f = json.loads(p.read_text())
    client = MongoClient("mongodb://localhost:27017")
    db = client.gisaid
    
    for time, ism in f.items():
        temp = {"date": time, time: ism}
        db.regionTimeSeries.update(temp, temp, upsert=True)
    return 0

if __name__ == "__main__":
    main()

