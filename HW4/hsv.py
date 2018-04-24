
import random
import hilbert
from numpy import genfromtxt
import math
import colorsys
from io import BytesIO
import random
import pandas as pd


def step(r, g, b, repetitions=1):
    lum = math.sqrt(.241 * r + .691 * g + .068 * b)

    h, s, v = colorsys.rgb_to_hsv(r, g, b)

    h2 = int(h * repetitions)
    lum2 = int(lum * repetitions)
    v2 = int(v * repetitions)

    return (h2, lum, v2)


filename = 'rock_color.csv'
my_data = pd.read_csv(filename, sep=',',header=None)
#my_data = genfromtxt(filename, delimiter=',', dtype=None)
# colours_length = 1000
# colours = []
# for i in range(1, colours_length):
#     colours.append(
#         [
#             random.random(),
#             random.random(),
#             random.random()
#         ]
#     )


print my_data.iloc[1]

colours_length = 1000
colours = []
for i in range(1, len(my_data)):
    colours.append (
        [
            my_data.iloc[i, 4],
            my_data.iloc[i, 5],
            my_data.iloc[i, 6],
            my_data.iloc[i, 0],
            my_data.iloc[i, 1],
            my_data.iloc[i, 3]

        ]
    )

colours.sort(key=lambda (r, g, b, artist, album, url):hilbert.Hilbert_to_int([int(r),int(g),int(b)]) )
print colours

new_file = open('rock_sorted.csv', 'a')
for i in range(1, len(colours)):
    new_file.write('%s, %s, %s, %s, %s, %s\n' % (colours[i][0], colours[i][1], colours[i][2], colours[i][3], colours[i][4], colours[i][5]))
