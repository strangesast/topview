import numpy as np
from pprint import pprint
np.set_printoptions(precision=4)

pi, cos, sin, sqrt = np.pi, np.cos, np.sin, np.sqrt

r = lambda a: np.array([[cos(a), -sin(a)], [sin(a), cos(a)]])

def rx(a):
    arr = np.diag(np.ones(4))
    arr[1:3,1:3] = r(a)
    return arr

def ry(a):
    arr = np.diag(np.ones(4))
    arr[0:4:2,0:4:2] = r(a)
    return arr

def rz(a):
    arr = np.diag(np.ones(4))
    arr[0:2,0:2] = r(a)
    return arr

def t(*args):
    arr = np.diag(np.ones(4))
    arr[0:3,3] = np.array((args + (0,)*3)[0:3])
    return arr

def txz(u, v):
    arr = np.diag(np.ones(4))
    d = sqrt(u**2 + v**2)
    arr[0:2, 0:2] = np.array([[u/d, v/d], [-v/d, u/d]])
    return arr

def tz(u, v, w):
    arr = np.diag(np.ones(4))
    d = sqrt(u**2 + v**2 + w**2)
    arr[0:4:2,0:4:2] = np.array([[w/d, -sqrt(u**2+v**2)/d], [sqrt(u**2+v**2)/d, w/sqrt(u**2 + v**2 + w**2)]])
    return arr

pprint(np.around(rx(pi/2)*180/pi))

from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import mpl_toolkits.mplot3d.axes3d as p3
import matplotlib.pyplot as plt
import matplotlib.animation as animation
fig = plt.figure()
ax = p3.Axes3D(fig)
v1 = [1, 0, 0]
v2 = [1, 0, 1]
v3 = [1, 1, 0]
p = np.vstack((v1, v2, v3))
verts = [p]
ax.add_collection3d(Poly3DCollection(verts))
plt.show()
