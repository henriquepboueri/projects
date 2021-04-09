# .. "as opt" means that the programmer could use the shorthand of "opt" to refer to this library, instead of typing the entire name
from scipy import optimize as opt
import numpy as np
import matplotlib.pyplot as plt


# Raw data manually entered by user
I = [4.0, 3.5, 3.0, 2.5, 2.0]
B = [1.31, 1.14, 0.97, 0.81, 0.76]
IError = [0.2, 0.2, 0.2, 0.2, 0.2]
BError = [0.03, 0.02, 0.04, 0.02, 0.05]

print("estimated B for each error \n")
for i in range(5):
    print(str(I[i]) + "+-" + str(IError[i]) +
          ": " + str(B[i]) + "+-" + str(BError[i]))

# Apply Numpy library to format the list of raw data into a multi-dimensional matrix
# This is necessary for function optimization and in order to properly use the Scipy package
xdata = np.array(I)
ydata = np.array(B)
xerror = np.array(IError)
yerror = np.array(BError)

# Define linear function for fitting,


def func(h, m, b):
    return m*h + b


# w gives the estimated parameter for m and b, stored in the square matrix of w and u
# the missing _ return info about variance and covariance

# w is a matrix with information about the value of slope and y-intercept
w, u = opt.curve_fit(func, xdata, ydata)

# Apply x coordinates and optimized result about curve fit to find the "Line of the Best Fit"
yfit = func(xdata, *w)

# Use Matplotlib package to graph data
# 1. Graph the error bars for each x-value
# 2. Graph the "Line of the Best Fit"

# Note: there are options to customize the look of your graph with different parameters
plt.errorbar(I, B, xerr=IError, yerr=BError, fmt='o', ms=3)
plt.plot(xdata, yfit, label="Fit", linewidth=1.5, linestyle='dashed')

# Add title and labels to the graph
plt.title('I vs. B of the Electromagnet')
plt.xlabel('Electromagnet Current I (A)')
plt.ylabel('Magnetic Field B (T)')


print("\n Estimated parameters of m and b: ", w)
print("\n Estimated variance of m & b: ", np.sqrt(np.diag(u)))

# If necessary, this is how you could save the graph to your local machine.
# But here we do NOT need to save the graph, so we will comment out this line.

# Specify the image name as the parameter
# plt.savefig('IvsB.jpg')

# Note: if you are showing and storing the graph, make sure you SAVE before SHOW.
plt.show()
