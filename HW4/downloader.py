import requests
import urllib
import hilbert
from numpy import genfromtxt
import math


# f = open('catalog.csv', 'r')
# address = f.readline()
# print(address)
#
# resp = urllib.urlopen(address)
# image_data = resp.read()
# f = open('cover_art/rnb/rnb.jpeg', 'wb')
# f.write(image_data)

# img_data = requests.get('https://i.scdn.co/image/2b8410c271e128a8b6e80d2293ed74addcc7e5f7').content
# with open('cover_art/rnb/album.jpeg', 'wb') as handler:
#     handler.write(img_data)

first = 'cover_art/rnb/rnb_'
last = '.jpeg'
filename = 'rnb_catalog.csv'


catalog = genfromtxt(filename, delimiter=',', dtype=None, )
my_catalog = []
final_catalog = open('rnb_full.csv', 'a')
for i in range(1, len(catalog)):
    my_catalog.append (
        [
            catalog[i, 0],
            catalog[i, 1],
            catalog[i, 2]
        ]
    )

print my_catalog[2][1]

try:

    while len(catalog):
        cnt = 1
        line = my_catalog[cnt][2]
        while line:
            line = my_catalog[cnt][2]
            imagepath = (first + '%i' + last) % cnt
            imagelabel = 'rnb_%i.jpeg' % cnt
            print(line)
            print(imagepath)
            resp = urllib.urlopen(line)
            image_data = resp.read()
            f = open(imagepath, 'wb')
            f.write(image_data)
            f.close()
            final_catalog.write('%s, %s, %s, %s \n' % (my_catalog[cnt][0], my_catalog[cnt][1], imagelabel, my_catalog[cnt][2]))
            # final_catalog.append(
            #     [
            #         my_catalog[cnt][0], #band name
            #         my_catalog[cnt][1], #album name
            #         imagelabel, #name of file
            #         my_catalog[cnt][2], #album cover url
            #     ]
            # )
            cnt += 1

except:
    None

print final_catalog

