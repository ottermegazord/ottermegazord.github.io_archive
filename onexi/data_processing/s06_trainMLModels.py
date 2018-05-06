import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
import pdb
import sys

from sklearn.linear_model import Ridge
from sklearn.linear_model import SGDRegressor
from sklearn.svm import SVR
from sklearn.neural_network import MLPRegressor
from sklearn.cross_validation import KFold

plt.style.use("ggplot")
os.chdir("..")

ipath = "./Data/Final_Data/"
ifile = "Final_Data"
ofile = "Final_Data_Aug_Pred"
ext = ".csv"

# Read full data set
df = pd.read_csv(ipath + ifile + ext, low_memory=False)
print("# data points: {}".format(len(df)))
# df = df[df["AV_PER_SQFT"] > 0]
# print("# data points after removing tax-exempt properties: {}".format(len(df)))

# Create augmented data till 2020
all_X = df[["TIME", "X", "Y"]]
X_2018 = df[df["TIME"] == 2017][["TIME", "X", "Y"]]
X_2018["TIME"] = 2018
X_2019 = df[df["TIME"] == 2017][["TIME", "X", "Y"]]
X_2019["TIME"] = 2019
X_2020 = df[df["TIME"] == 2017][["TIME", "X", "Y"]]
X_2020["TIME"] = 2020
aug_X = all_X.append([X_2018, X_2019, X_2020])
aug_X = aug_X.reset_index(drop=True)

# Normalize predictors in data set
print("MAX and MIN of TIME: ({}, {})".format(df["TIME"].max(), df["TIME"].min()))
df["TIME"] = (df["TIME"] - df["TIME"].min())/(df["TIME"].max() - df["TIME"].min())
aug_X["TIME"] = (aug_X["TIME"] - aug_X["TIME"].min())/(aug_X["TIME"].max() - aug_X["TIME"].min())

print("MAX and MIN of X: ({}, {})".format(df["X"].max(), df["X"].min()))
df["X"] = (df["X"] - df["X"].min())/(df["X"].max() - df["X"].min())
aug_X["X"] = (aug_X["X"] - aug_X["X"].min())/(aug_X["X"].max() - aug_X["X"].min())

print("MAX and MIN of Y: ({}, {})".format(df["Y"].max(), df["Y"].min()))
df["Y"] = (df["Y"] - df["Y"].min())/(df["Y"].max() - df["Y"].min())
aug_X["Y"] = (aug_X["Y"] - aug_X["Y"].min())/(aug_X["Y"].max() - aug_X["Y"].min())

# Separate into train and test data sets
df_train = df.sample(frac=0.7, replace=False) # Can use frac=0.7 or n=10000
df_test = df.loc[~df.index.isin(df_train.index)]

# Create X for train and test data sets
df_X_train = df_train[["TIME", "X", "Y"]]
df_X_test = df_test[["TIME", "X", "Y"]]

# Create y for test and train datasets
df_y_train = df_train[["AV_PER_SQFT"]]
df_y_test = df_test[["AV_PER_SQFT"]]

# X is nxd np array
train_X_np = df_X_train.as_matrix()
test_X_np = df_X_test.as_matrix()
aug_X_np = aug_X.as_matrix()

# y is nx1 column vector
train_y_np = df_y_train.as_matrix()
test_y_np = df_y_test.as_matrix()

print("DATA PROCESSING COMPLETE")

#######################################################################################################################

##### PLOTTING RESULTS

def plotRegression(lambda_list, avg_train_score, avg_test_score):

	mpl_fig = plt.figure()
	ax = mpl_fig.add_subplot(111)
	ax.grid(color="black", linestyle='-', linewidth=0.5)

	line_train, = ax.plot(lambda_list, avg_train_score, color="blue", linestyle="solid", linewidth=0.75)
	line_test, = ax.plot(lambda_list, avg_test_score, color="red", linestyle="solid", linewidth=0.75)

	ax.set_title("Ridge Regression", fontsize=20, fontweight="bold")
	# ax.set_title("Support Vector Regression (rbf kernel)", fontsize=20, fontweight="bold")
	# ax.set_title("Support Vector Regression (poly kernel)", fontsize=20, fontweight="bold")
	# ax.set_title("Support Vector Regression (linear kernel)", fontsize=20, fontweight="bold")
	# ax.set_title("SGD Regression", fontsize=20, fontweight="bold")

	ax.set_xlabel("Regularization Parameter (λ)", fontsize=16)
	ax.set_ylabel("Average Prediction Accuracy", fontsize=16)
	ax.set_xlim(left=0.0, right=10.0)
	ax.set_ylim(bottom=0.0, top=1.0)
	ax.legend(handles=(line_train, line_test), labels=("Training Data", "Test Data"), loc="lower right")

	mpl_fig.savefig('regularization_ridgeRegression.png', bbox_inches='tight', dpi=300)
	# mpl_fig.savefig('regularization_SVR_rbf.png', bbox_inches='tight', dpi=300)
	# mpl_fig.savefig('regularization_SVR_poly.png', bbox_inches='tight', dpi=300)
	# mpl_fig.savefig('regularization_SVR_linear.png', bbox_inches='tight', dpi=300)
	# mpl_fig.savefig('regularization_SGD.png', bbox_inches='tight', dpi=300)

def plotNeuralNet(lambda_list, train_score, test_score):

	mpl_fig = plt.figure()
	ax = mpl_fig.add_subplot(111)
	ax.grid(color="black", linestyle='-', linewidth=0.5)

	line_train, = ax.plot(lambda_list, train_score, color="blue", linestyle="solid", linewidth=0.75)
	line_test, = ax.plot(lambda_list, test_score, color="red", linestyle="solid", linewidth=0.75)

	ax.set_title("Neural Network", fontsize=20, fontweight="bold")
	ax.set_xlabel("Regularization Parameter (λ)", fontsize=16)
	ax.set_ylabel("Average Prediction Accuracy", fontsize=16)
	ax.set_xlim(left=0.0, right=10.0)
	ax.set_ylim(bottom=0.0, top=1.0)
	ax.legend(handles=(line_train, line_test), labels=("Training Data", "Test Data"), loc="lower right")

	mpl_fig.savefig('regularization_neuralNet.png', bbox_inches='tight', dpi=300)
	
#######################################################################################################################

##### MACHINE LEARNING MODEL IMPLEMENTATION

input_var1 = input("Run mode (train/predict): ")
input_var2 = input("Model type (regression/neural_net): ") # input for Py3 and raw_input for Py2

if input_var1 == "train" and input_var2 == "regression":
	numFolds = 5
	kf = KFold(len(train_X_np), numFolds, shuffle=True)
	lambda_list = [1e-1 * x for x in range(1,50)] # ranges from 0.1 to 5 with step size of 0.1
	score_train, score_test = (pd.DataFrame() for i in range(2))
	regCounter = 0
	crossvalidCounter = 0

	for train_indices, test_indices in kf:

		regCounter = 0
		train_X = train_X_np[train_indices, :]
		train_y = train_y_np[train_indices, :]
		test_X = train_X_np[test_indices, :]
		test_y = train_y_np[test_indices, :]

		for lam in lambda_list:
			
			clf = Ridge(alpha=lam, fit_intercept=True, max_iter=None, tol=0.01, solver="auto")
			# clf = SVR(kernel="rbf", degree=3, gamma="auto", C=1.0/lam, epsilon=0.1)
			# clf = SVR(kernel="poly", degree=3, gamma="auto", C=1.0/lam, epsilon=0.1)
			# clf = SVR(kernel="linear", degree=3, gamma="auto", C=1.0/lam, epsilon=0.1)
			# clf = SGDRegressor(loss="squared_loss", penalty="l2", alpha=lam, fit_intercept=True, max_iter=5000, tol=0.01, learning_rate="optimal", eta0=0.01)
			
			clf.fit(train_X, train_y)
			score_train.at[regCounter, crossvalidCounter] = clf.score(train_X, train_y)
			score_test.at[regCounter, crossvalidCounter] = clf.score(test_X, test_y)
			regCounter += 1

			if (regCounter % 10 == 0):
				print("Completed lambda iteration #: {}".format(regCounter))

		crossvalidCounter += 1
		print("Completed cross-validation iteration #: {}".format(crossvalidCounter))

	avg_train_score = score_train.mean(axis=1)
	avg_test_score = score_test.mean(axis=1)
	plotRegression(lambda_list, avg_train_score, avg_test_score)

elif input_var1 == "train" and input_var2 == "neural_net":
	lambda_list = [5e-1 * x for x in range(1,10)] # ranges from 0.5 to 5 with step size of 0.5
	score_train, score_test = (pd.DataFrame() for i in range(2))
	avg_train_score, avg_test_score = [], []
	regCounter = 0	

	for lam in lambda_list:
		clf = MLPRegressor(hidden_layer_sizes=(14,), activation="relu", solver="adam", alpha=lam, max_iter=500, tol=1e-04, early_stopping=True, validation_fraction=0.1)
		clf.fit(train_X_np, train_y_np)
		score_train.at[regCounter, "Score"] = clf.score(train_X_np, train_y_np)
		score_test.at[regCounter, "Score"] = clf.score(test_X_np, test_y_np)
		print("(Lambda, Train Score, Test Score: {}, {}, {})".format(lam, score_train.at[regCounter, "Score"], score_test.at[regCounter, "Score"]))
		regCounter += 1

	avg_train_score = score_train["Score"].mean()
	avg_test_score = score_test["Score"].mean()
	print("Average Train Score: {}".format(avg_train_score))
	print("Average Test Score: {}".format(avg_test_score))
	plotNeuralNet(lambda_list, score_train, score_test)

elif input_var1 == "predict":
	
	# Regression predictions
	print("Predicting using regression")
	clf = Ridge(alpha=0.5, fit_intercept=True, max_iter=None, tol=0.001, solver="auto")
	clf.fit(train_X_np, train_y_np)
	print("Model intercept: {}".format(clf.intercept_))
	print("Model coefficients: {}".format(clf.coef_))
	print("Train Score: {}".format(clf.score(train_X_np, train_y_np)))
	print("Test Score: {}".format(clf.score(test_X_np, test_y_np)))

	predict_reg = clf.predict(aug_X_np)
	aug_X["PRED_REG"] = predict_reg

	# Neural net predictions
	print("Predicting using neural network")
	clf = MLPRegressor(hidden_layer_sizes=(14,), activation="relu", solver="adam", alpha=0.5, max_iter=500, tol=1e-04, early_stopping=True, validation_fraction=0.1)
	clf.fit(train_X_np, train_y_np)
	print("Model intercept: {}".format(clf.intercepts_))
	print("Model coefficients: {}".format(clf.coefs_))
	print("Train Score: {}".format(clf.score(train_X_np, train_y_np)))
	print("Test Score: {}".format(clf.score(test_X_np, test_y_np)))

	predict_nnet = clf.predict(aug_X_np)
	aug_X["PRED_NNET"] = predict_nnet

# Write to output file
aug_X.to_csv(ipath + ofile + ext, index=False)

#######################################################################################################################
