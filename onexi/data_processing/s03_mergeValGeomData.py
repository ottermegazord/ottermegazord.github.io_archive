import pandas as pd
import os
import pdb

os.chdir("..")

ipath_Val = "./Data/Cleaned_Data/LandVal_"
ipath_Geom = "./ShapefilesExtractedGDB/GeomCSV/Geom_"
opath = "./Data/Merged_Data/Merged_"
ext = ".csv"

for year in range(2004, 2018, 1):
	print("Processing year {}".format(year))
	
	val = pd.read_csv(ipath_Val + str(year) + ext, low_memory=False, dtype={'PID': str})
	print("# of parcels with value: {}".format(len(val)))

	geom = pd.read_csv(ipath_Geom + str(year) + ext, low_memory=False, dtype={'PID_LONG': str})
	print("# of parcels with geometry: {}".format(len(geom)))

	merged = pd.merge(val, geom, left_on="PID", right_on="PID_LONG")
	print("# of parcels after merging: {}".format(len(merged)))

	merged = merged[["PID", "X", "Y", "AV_TOTAL", "AREA_SQFT", "NEIGHBORHOOD"]]
	merged["AV_PER_SQFT"] = merged["AV_TOTAL"]/merged["AREA_SQFT"]
	merged.to_csv(opath + str(year) + ext, index=False)
