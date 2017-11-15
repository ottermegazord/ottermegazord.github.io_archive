import requests
import urllib

# f = open('catalog.csv', 'r')
# address = f.readline()
# print(address)
#
# resp = urllib.urlopen(address)
# image_data = resp.read()
# f = open('cover_art/metal/metal.jpeg', 'wb')
# f.write(image_data)

# img_data = requests.get('https://i.scdn.co/image/2b8410c271e128a8b6e80d2293ed74addcc7e5f7').content
# with open('cover_art/metal/album.jpeg', 'wb') as handler:
#     handler.write(img_data)

first = 'cover_art/metal/metal_'
last = '.jpeg'

filepath = 'metal_catalog.csv'
with open(filepath) as fp:
    line = fp.readline()
    cnt = 1
    while line:
        line = fp.readline()
        imagepath = (first + '%i' + last) % cnt
        print(line)
        print(imagepath)
        resp = urllib.urlopen(line)
        image_data = resp.read()
        f = open(imagepath, 'wb')
        f.write(image_data)
        f.close()
        cnt += 1