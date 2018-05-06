# Requires installation of rtree
# Installing python3-rtree package on Ubuntu 16.04 (Xenial Xerus)
# sudo apt-get install python3-rtree

import geopandas as gpd
from shapely.geometry import Point
import pandas as pd
import os
import pdb

os.chdir("..")

ipath = "./ShapefilesExtractedGDB/Shapefiles/parcels_"
ipath2 = "./ShapefilesExtractedGDB/Shapefiles/nhoods_boston"
opath = "./ShapefilesExtractedGDB/GeomCSV/"
ext = ".shp"

print("Reading neighborhood file")
nhoods = gpd.read_file(ipath2 + ext)
nhoods.reset_index(drop=True)
print("CRS: {}".format(nhoods.crs))
print("# of neighborhoods: {}".format(len(nhoods)))

# Re-project to WGS84 [EPSG: 4326] to successfully enable spatial join operation with centroid GeoDataFrame object later
nhoods = nhoods.to_crs({'init': 'epsg:4326'})

nhood_polys = {}
for i in range(len(nhoods)):
	nhood = nhoods.iloc[i]
	nhood_polys[nhood["nhood_name"]] = nhood["geometry"]
nhood_polys = gpd.GeoSeries(nhood_polys) # GeoPandas GeoSeries object

for year in range(2004, 2018, 1):
	print("Processing year {}".format(year))
	
	parcels = gpd.read_file(ipath + str(year) + ext) # GeoPandas GeoDataFrame object
	parcels.reset_index(drop=True)
	print("CRS: {}".format(parcels.crs)) 
	print("# of parcels: {}".format(len(parcels)))

	# Re-project to NAD83 / Massachusetts Mainland (ftUS) CRS [EPSG: 2249]
	parcels = parcels.to_crs({'init': 'epsg:2249'})

	centroids = parcels # Pandas DataFrame object (only attributes are copied)
	centroids["area"] = parcels['geometry'].area # in square feet since CRS in in ft

	# Re-project to WGS84 (EPSG: 4326) to get centroid coordinates in latitude and longitude
	centroids = centroids.to_crs({'init': 'epsg:4326'})
	centroids["x"] = centroids.centroid.map(lambda p: p.x)
	centroids["y"] = centroids.centroid.map(lambda p: p.y)
	centroids['geometry'] = centroids.apply(lambda row: Point(row.x, row.y), axis=1) # Makes a GeoPandas GeoDataFrame object

	print("Starting spatial join operation")
	cent_nhoods = centroids.assign(**{key: centroids.within(geom) for key, geom in nhood_polys.items()})
	# cent_nhoods = gpd.sjoin(centroid, nhoods, how="inner", op="within")
	print("# of joined parcels: {}".format(len(cent_nhoods)))

	columnsOfInterest = ["PID_LONG", "x", "y", "area", "Allston", "Back Bay", "Bay Village", "Beacon Hill", "Brighton", "Charlestown", "Chinatown", "Dorchester", "Downtown", "East Boston", "Fenway", "Harbor Islands", "Hyde Park", "Jamaica Plain", "Leather District", "Longwood Medical Area", "Mattapan", "Mission Hill", "North End", "Roslindale", "Roxbury", "South Boston", "South Boston Waterfront", "South End", "West End", "West Roxbury"]
	cent_nhoods = cent_nhoods[columnsOfInterest]

	# Combines all the boolean values into a single column representing the neighborhood value (text)
	cent_nhoods["nhood"] = cent_nhoods.iloc[:, 4:].apply(lambda x: cent_nhoods.iloc[:, 4:].columns[x.astype(bool)].tolist(), axis=1)
	# Unpacks the list to get element values (only 1 in this case)
	cent_nhoods[["NEIGHBORHOOD"]] = pd.DataFrame(cent_nhoods.nhood.values.tolist(), index= cent_nhoods.index)
	columnsOfInterest = ["PID_LONG", "x", "y", "area", "NEIGHBORHOOD"]
	cent_nhoods = cent_nhoods[columnsOfInterest]
	cent_nhoods.columns = ["PID_LONG", "X", "Y", "AREA_SQFT", "NEIGHBORHOOD"]

	print("Writing to csv file")
	cent_nhoods.to_csv(opath + "Geom_" + str(year) + ".csv", index=False)
	