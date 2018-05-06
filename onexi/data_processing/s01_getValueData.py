import pandas as pd
import os
import pdb

os.chdir("..")

ipath = "./Data/Raw_Data/property-assessment-fy"
opath = "./Data/Cleaned_Data/LandVal_"
ext = ".csv"

for year in range(2004, 2019, 1):
	print("Processing year {}".format(year))

	ifile = pd.read_csv(ipath + str(year) + ext, low_memory=False, dtype={'PID': str})
	print("# of lines: {}".format(len(ifile)))
	
	ifile2 = ifile.drop_duplicates(subset="PID")
	print("# of lines after removing duplicate PIDs: {}".format(len(ifile2)))

	if year <= 2008:
		columnsOfInterest = ["PID", "FY" + str(year) + "_TOTAL"]
	else:
		columnsOfInterest = ["PID", "AV_TOTAL"]

	ifile2 = ifile2[columnsOfInterest]
	ifile2.columns = ["PID", "AV_TOTAL"]
	ifile2.to_csv(opath + str(year) + ext, index=False)
