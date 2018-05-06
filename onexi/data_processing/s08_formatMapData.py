import pandas as pd
import os
import pdb
import sys

os.chdir("..")

ipath = "./Data/Final_Data/"
ifile = "MapData_Full"
opath = "Map_Data/"
ext = ".csv"

df = pd.read_csv(ipath + ifile + ext, low_memory=False)

for y in range(2004, 2021):
	sub_df = df[df["TIME"] == y]
	sub_df.to_csv(ipath + opath + 'Parcel_Value_' + str(y) + ext, index=False)
