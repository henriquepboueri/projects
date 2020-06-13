import os

dir_path = os.path.abspath(os.path.dirname(__file__))
txt_path = os.path.join(dir_path, "folders.txt")

# Read file containing world names
folders = open(txt_path)

for folder in folders:
    try:
        os.mkdir(folder.strip())
    except:
        continue
    
folders.close()

