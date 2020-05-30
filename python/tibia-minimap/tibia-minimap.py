import cv2
import numpy as np
import glob

px = [0, 255, 255]
npx = np.array(px, 'uint8')

filenames = glob.glob("original/*.png")
for file in filenames:
    print(file)
    img = cv2.imread(file)
    print(img.ndim)
    '''for i in range(0,  img.shape[0], 2):
        for j in range(0, img.shape[1], 2):
            if(not np.array_equal(img[i,j], npx)):
               img[i,j] = [0, 0, 0]'''          
    #cv2.imwrite(file, img)
