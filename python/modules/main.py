# import my_module as mm
from random import random
from time import sleep


def counter(maximum):
    i = 0
    while i < maximum:
        val = (yield i)
        # If value provided, change counter
        if val is not None:
            i = val
        else:
            i += 1


def time_counter():
    i = 0
    while 1:
        i += 1
        sleep(1)
        yield i


def main():
    for v in time_counter():
        print(v)


def generate_ints(n):
    for i in range(n):
        r = random()
        sleep(r * 2)
        yield i, r


def inorder(t):
    if t:
        for x in inorder(t.left):
            yield x

        yield t.label

        for x in inorder(t.right):
            yield x


if __name__ == '__main__':
    main()
