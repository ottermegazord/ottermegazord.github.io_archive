from spotipy.oauth2 import SpotifyClientCredentials
import json
import spotipy
import time
import sys
import csv
import requests

f = open('metal_catalog.csv', 'a')

client_credentials_manager = SpotifyClientCredentials(client_id='ae249f7b8b754187a4d8d31d9ee5d6d3', client_secret = 'bfcc0820211b4f7587a885da3798cdb0')
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
sp.trace = False

if len(sys.argv) > 1:
    name = ' '.join(sys.argv[1:])
else:
    name = 'Marilyn Manson'

results = sp.search(q='artist:' + name, type='artist')
items = results['artists']['items']
if len(items) > 0:
    artist = items[0]
    artist_id = artist['id']
    # print artist['name'], artist_id

results = sp.artist_albums(artist_id, album_type='album')
albums = results['items']
while results['next']:
    results = sp.next(results)
    albums.extend(results['items'])

for album in albums:
    #print(album['name'])
    address = str(album['images'][0]['url'])
    print(address)
    f.write(address + '\n')
    # with open('catalog.csv', 'wb') as f:
    #     writer = csv.writer(f)
    #     address = str(album['images'][0]['url'])
    #     print(address)
    #     # print(album['images'][0]['url'])
    #     writer.writerows([address])

    # print artist['name'], artist['images'][0]['url']

# artist_name = 'Slayer'
#
# if len(sys.argv) > 1:
#     artist_name = ' '.join(sys.argv[1:])
# results = sp.search(q=artist_name, limit=50)
# tids = []
# print results['tracks']
# # for i, t in enumerate(results['tracks']['items']):
# #     print(' ', i, t['name'])
# # tids.append(t['uri'])
