import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import os
import pdb
import sys

plt.style.use("ggplot")
os.chdir("..")

ipath = "./Data/Final_Data/"
ifile1 = "Final_Data_Aug_Pred"
ifile2 = "Final_Data"
opath = "./Data/Final_Data/Neighborhoods/"
imgpath = "./Plots/Neighborhood_TS/"
ext = ".csv"

input_var = raw_input("Run mode (analysis/plot): ")

if input_var == "analysis":

	df0 = pd.read_csv(ipath + ifile1 + ext, low_memory=False)
	df1 = pd.read_csv(ipath + ifile2 + ext, low_memory=False)
	df = pd.concat([df0, df1], axis=1)
	df.columns = ['t','x','y','PRED_REG','PRED_NNET','TIME','X','Y','TRUE','NEIGHBORHOOD']
	df = df[['TIME', 'X', 'Y', 'NEIGHBORHOOD', 'TRUE', 'PRED_REG', 'PRED_NNET']]

	df_2017 = df[df["TIME"] == 2017.0].reset_index(drop=True)
	known_sample = len(df[df["TIME"] <= 2017.0])
	df_2018 = df.ix[[df.index[i] for i in range(known_sample, known_sample + len(df_2017))]]
	df_2019 = df.ix[[df.index[i] for i in range(known_sample + len(df_2017), known_sample + 2*len(df_2017))]]
	df_2020 = df.ix[[df.index[i] for i in range(known_sample + 2*len(df_2017), known_sample + 3*len(df_2017))]]

	df_2018["TIME"], df_2019["TIME"], df_2020["TIME"] = 2018.0, 2019.0, 2020.0

	df_2018 = df_2018[["TIME", "PRED_REG", "PRED_NNET"]].reset_index(drop=True)
	df_2018 = pd.concat([df_2018, df_2017], axis=1)
	df_2018.columns = ["TIME", "PRED_REG", "PRED_NNET", "t", "X", "Y", "NEIGHBORHOOD", "TRUE", "p1", "p2"]
	df_2018 = df_2018[["TIME", "X", "Y", "NEIGHBORHOOD", "TRUE", "PRED_REG", "PRED_NNET"]]
	df_2018["TRUE"] = 0
	
	df_2019 = df_2019[["TIME", "PRED_REG", "PRED_NNET"]].reset_index(drop=True)
	df_2019 = pd.concat([df_2019, df_2017], axis=1)
	df_2019.columns = ["TIME", "PRED_REG", "PRED_NNET", "t", "X", "Y", "NEIGHBORHOOD", "TRUE", "p1", "p2"]
	df_2019 = df_2019[["TIME", "X", "Y", "NEIGHBORHOOD", "TRUE", "PRED_REG", "PRED_NNET"]]
	df_2019["TRUE"] = 0

	df_2020 = df_2020[["TIME", "PRED_REG", "PRED_NNET"]].reset_index(drop=True)
	df_2020 = pd.concat([df_2020, df_2017], axis=1)
	df_2020.columns = ["TIME", "PRED_REG", "PRED_NNET", "t", "X", "Y", "NEIGHBORHOOD", "TRUE", "p1", "p2"]
	df_2020 = df_2020[["TIME", "X", "Y", "NEIGHBORHOOD", "TRUE", "PRED_REG", "PRED_NNET"]]
	df_2020["TRUE"] = 0

	df_known = df[df["TIME"] <= 2017.0]
	df = df_known.append([df_2018, df_2019, df_2020]).reset_index(drop=True)
	df['TIME'] = df['TIME'].astype(np.int64)
	df.to_csv(ipath + "MapData_Full.csv", index=False)
	df2 = df.groupby(["TIME", "NEIGHBORHOOD"]).mean().unstack()

	time = df["TIME"].unique().tolist()
	nhood = df["NEIGHBORHOOD"].unique().tolist()
	nhood = [x for x in nhood if str(x) != 'nan']

	for n in nhood:
		mean_true, mean_reg, mean_nnet = [], [], []
		for t in time:
			mean_true.append(df2.loc[t, ("TRUE", n)])
			mean_reg.append(df2.loc[t, ("PRED_REG", n)])
			mean_nnet.append(df2.loc[t, ("PRED_NNET", n)])
		out_df = pd.DataFrame({'TIME': time, 'MEAN_TRUE': mean_true, 'MEAN_REG': mean_reg, 'MEAN_NNET': mean_nnet})
		out_df.to_csv(opath + n + ext, index=False)

elif input_var == "plot":

	def makePlot(x, true, reg, nnet, xlabel, ylabel, title, filename):
		N = 17
		ind = np.arange(N)
		width = 0.25

		plt.bar(ind - width, true, width=0.25, align="center", color='green', label="True Value")
		plt.bar(ind, reg, width=0.25, align="center", color="blue", label="Predicted Value (Regression)")
		plt.bar(ind + width, nnet, width=0.25, align="center", color="red", label="Predicted Value (Neural Net)")

		plt.ylabel(ylabel)
		plt.xlabel(xlabel)
		plt.title(title)
		plt.xticks(ind + width, map(int, x), fontsize=6)
		plt.legend(loc="best")
		plt.savefig(filename, bbox_inches="tight", dpi=300)
		plt.close()

	nhood_files = os.listdir(opath)
	for f in nhood_files:
		nhood = f[:-4]
		df = pd.read_csv(opath + f, low_memory=False)
		df["YEAR"] = df["TIME"]
		makePlot(x=df["YEAR"].tolist(), true=df["MEAN_TRUE"].tolist(), reg=df["MEAN_REG"].tolist(), nnet=df["MEAN_NNET"].tolist(), ylabel="AVG LAND VALUE ($/sqft)", xlabel="TIME (year)", title=nhood, filename=imgpath + nhood +".png")
