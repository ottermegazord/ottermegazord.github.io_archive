from PIL import Image

img = Image.open('/Users/idaly666/PycharmProjects/4033mit/HW4/cover_art/metal/metal_23.jpeg')
rgbimg = img.convert('RGB')
for i in range(5):
    print rgbimg.getpixel((i, 0))