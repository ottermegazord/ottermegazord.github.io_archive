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

f = open('asians_parse.csv', 'a')
geolocator = GoogleV3(api_key="AIzaSyCyjvDR65X330ffLtPwGKQ_X_rjoEo0k4c")
df = pd.read_table('allasian.csv', sep=",")
# print(df)
#print(df.loc[1:, "GEO.display-label"])
#f.write('name,latitude,longitude,indian,chinese,filipino,japanese,korean,vietnamese,others\n')
for i in range(0, len(df)):
# for i in range(1, 2):
    print ("%d / %d \n" % (i, len(df)))
    name = (df.loc[i, "GEO.display-label"])
    indian = df.loc[i, "HC01_VC57"]
    chinese = df.loc[i, "HC01_VC58"]
    filipino = df.loc[i, "HC01_VC59"]
    japanese = df.loc[i, "HC01_VC60"]
    korean = df.loc[i, "HC01_VC61"]
    vietnamese = df.loc[i, "HC01_VC62"]
    others = df.loc[i, "HC01_VC63"]
    try:
        location = geolocator.geocode(name)
    except:
        None
    f.write('"%s",%.7f,%.7f,%s,%s,%s,%s,%s,%s,%s\n' % (name,location.latitude, location.longitude, indian, chinese, filipino, japanese, korean, vietnamese, others))
