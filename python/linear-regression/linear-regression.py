import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

USAhousing = pd.read_csv('USA_Housing.csv')
USAhousing.head()
USAhousing.info()
USAhousing.describe()
USAhousing.columns
