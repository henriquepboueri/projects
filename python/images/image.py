from __future__ import print_function
import cv2
import numpy as np
import os, sys

px = [0, 242, 255]
npx = np.array(px, 'uint8')

img = cv2.imread('sample.png')
for i in range(0,  img.shape[0], 2):
    for j in range(0, img.shape[1], 2):
        if(not np.array_equal(img[i,j], npx)):
           img[i,j] = npx
cv2.imwrite('sample2.png', img)
