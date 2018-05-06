import pandas as pd
import os
import pdb

os.chdir("..")

ipath = "./Data/Merged_Data/Merged_"
opath = "./Data/Final_Data/Final_Data"
ext = ".csv"

final_df = pd.DataFrame()

for year in range(2004, 2018, 1):
	print("Processing year {}".format(year))

	df = pd.read_csv(ipath + str(year) + ext, low_memory=False)
	df["TIME"] = year
	df = df[["TIME", "X", "Y", "AV_PER_SQFT", "NEIGHBORHOOD"]]

	final_df = pd.concat([final_df, df])

final_df.to_csv(opath + ext, index=False)
