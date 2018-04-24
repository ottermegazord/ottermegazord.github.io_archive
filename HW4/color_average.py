# from PIL import Image
#
# img = Image.open('/Users/idaly666/PycharmProjects/4033mit/HW4/cover_art/rock/rock_100.jpeg')
# rgbimg = img.convert('RGB')
# for i in range(5):
#     print rgbimg.getpixel((i, 0))


from PIL import Image
import webcolors
import sys

reload(sys)
sys.setdefaultencoding('utf8')

class PixelCounter(object):
    ''' loop through each pixel and average rgb '''

    def __init__(self, imageName):
        self.pic = Image.open(imageName)
        # load image data
        self.imgData = self.pic.load()

    def averagePixels(self):
        r, g, b = 0, 0, 0
        count = 0
        for x in xrange(self.pic.size[0]):
            for y in xrange(self.pic.size[1]):
                tempr, tempg, tempb = self.imgData[x, y]
                r += tempr
                g += tempg
                b += tempb
                count += 1
        # calculate averages
        return (r / count), (g / count), (b / count), count


if __name__ == '__main__':

    f = open('rock_full.csv', 'r')
    f_color = open('rock_color.csv', 'a')
    first = 'cover_art/rock/rock_'
    last = '.jpeg'

    for i in range(1,1778):
        imagepath = (first + '%i' + last) % i
        pc = PixelCounter(imagepath)
        print "(red, green, blue, total_pixel_count)"
        red, green, blue, total_pixel_count = pc.averagePixels()
        hexa = webcolors.rgb_to_hex((red, green, blue))
        print webcolors.rgb_to_hex((red, green, blue))
        liner = f.readline().rstrip()
        f_color.write('%s, %s, %s, %s, %s \n' % (liner,red, green, blue, hexa))