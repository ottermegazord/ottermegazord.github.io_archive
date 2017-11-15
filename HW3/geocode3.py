from geopy.geocoders import GoogleV3
import csv
import pandas as pd
# with open('asians.csv', 'rU') as csvfile:
#     reader = csv.reader(csvfile)
#     # for row in reader:
#     #     print(row[0])
#
# col_1 = list(zip)
# geolocator = Nominatim()
# location = geolocator.geocode("Singapore")
# print(location.latitude, location.longitude)

f = open('asian_percent.csv', 'a')
geolocator = GoogleV3(api_key="AIzaSyCyjvDR65X330ffLtPwGKQ_X_rjoEo0k4c")
df = pd.read_table('asian_pop.csv', sep=",")
# print(df)
#print(df.loc[1:, "GEO.display-label"])
#f.write('name,latitude,longitude,indian,chinese,filipino,japanese,korean,vietnamese,others\n')
for i in range(0, len(df)):
# for i in range(1, 2):
    print ("%d / %d \n" % (i, len(df)))
    county = (df.loc[i, "county"])
    asians = df.loc[i, "asians"]
    total = df.loc[i, "total"]
    percent = df.loc[i, "percent"]
    try:
        location = geolocator.geocode(county)
    except:
        None
    f.write('"%s",%.7f,%.7f,%s,%s, %s\n' % (county,location.latitude, location.longitude, asians, total, percent))
