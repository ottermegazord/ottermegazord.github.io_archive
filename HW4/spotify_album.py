from spotipy.oauth2 import SpotifyClientCredentials
import json
import spotipy
import time
import sys
import csv
import requests

f = open('rock_catalog.csv', 'a')

client_credentials_manager = SpotifyClientCredentials(client_id='ae249f7b8b754187a4d8d31d9ee5d6d3', client_secret = 'bfcc0820211b4f7587a885da3798cdb0')
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
sp.trace = False

while 1:
    if len(sys.argv) > 1:
        name = ' '.join(sys.argv[1:])
    else:
        name = raw_input('Key in Artist: ' )

    results = sp.search(q='artist:' + name, type='artist')
    items = results['artists']['items']
    if len(items) > 0:
        artist = items[0]
        artist_id = artist['id']
        print artist['name'], artist_id

    results = sp.artist_albums(artist_id, album_type='album')
    albums = results['items']
    while results['next']:
        results = sp.next(results)
        albums.extend(results['items'])

    for album in albums:
        artist_name = artist['name']
        album_name = album['name']
        address = album['images'][0]['url']
        print('%s, "%s", %s \n' % (artist_name, album_name, address))
        f.write('%s, %s, %s \n' % (artist_name.encode('utf-8'), album_name.encode('utf-8'), address.encode('utf-8')))

