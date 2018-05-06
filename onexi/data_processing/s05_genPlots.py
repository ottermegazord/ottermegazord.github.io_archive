import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os
import pdb
import sys

plt.style.use("ggplot")
os.chdir("..")

ipath = "./Data/Final_Data/"
ifile = "Final_Data"
opath = "./Data/Final_Data/Neighborhoods/"
imgpath = "./Plots/Neighborhood_TS/"
ext = ".csv"

input_var = raw_input("Run mode (analysis/plot): ")

if input_var == "analysis":

	df = pd.read_csv(ipath + ifile + ext, low_memory=False)
	df2 = df.groupby(["TIME", "NEIGHBORHOOD"]).mean().unstack()

	time = df["TIME"].unique().tolist()
	nhood = df["NEIGHBORHOOD"].unique().tolist()
	nhood = [x for x in nhood if str(x) != 'nan']

	for n in nhood:
		mean = []
		for t in time:
			mean.append(df2.loc[t, ("AV_PER_SQFT", n)])
		out_df = pd.DataFrame({'TIME': time, 'MEAN_AV_PER_SQFT': mean})
		out_df.to_csv(opath + n + ext, index=False)

elif input_var == "plot":

	def makePlot(x, y, xlabel, ylabel, title, filename):
		x_pos = [i for i, _ in enumerate(x)]
		plt.bar(x_pos, y, color='green')
		plt.ylabel(ylabel)
		plt.xlabel(xlabel)
		plt.title(title)
		plt.xticks(x_pos, x, fontsize=8)
		plt.savefig(filename, bbox_inches="tight", dpi=300)
		plt.close()

	nhood_files = os.listdir(opath)
	for f in nhood_files:
		nhood = f[:-4]
		df = pd.read_csv(opath + f, low_memory=False)
		makePlot(x=df["TIME"].tolist(), y=df["MEAN_AV_PER_SQFT"].tolist(), ylabel="AVG LAND VALUE ($/sqft)", xlabel="TIME (year)", title=nhood, filename=imgpath + nhood +".png")
