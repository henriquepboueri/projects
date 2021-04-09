# # # def isPalindrome(str):
# # #     if str == str[::-1]:
# # #         return True
# # #     else:
# # #         return False


# # # def main():
# # #     word = input("Enter a word: ")
# # #     if isPalindrome(word):
# # #         print('True')
# # #     else:
# # #         print('False')


# # # if __name__ == '__main__':
# # #     main()

# # # dict = {'a': 1, 0: 'zero'}
# # # dict[2] = 'two'
# # # print(dict[2])

# # # #sets, dictionaries, lists, tuples
# # # # sets are ordered

# # # l = list(dict.items())
# # # print(type(l[0]))

# # def main():
# #     print('main.py executed')


# # if __name__ == '__main__':
# #     main()


# def concat(*args, sep="/", l: list):
#     print()
#     return sep.join(args)


# print(concat('Lunes', "Martes", "Miercoles"))

# from collections import deque

# queue = deque(["Eric", "John", "Michael"])
# queue.append("Terry")           # Terry arrives
# queue.append("Graham")          # Graham arrives
# first_out = queue.popleft()
# print(first_out)


# list(map(lambda x: x ** 2, range(1, 11)))
# l = ['tic', 'tac', 'toe']

# for i, v in enumerate(l):
#     print(i, v)

# for i in range(len(l)):
#     print(i, l[i])

# l = ['tic', 'tac', 'toe']
# questions = ['name', 'quest', 'favorite color']
# answers = ['lancelot', 'the holy grail', 'blue']
# for q, a, i in zip(questions, answers, l):
#     print(q, a, i)

# for i in reversed(range(1, 10, 2)):
#     print(i)

# import math
# raw_data = [56.2, float('NaN'), 51.7, 55.3, 52.5, float('NaN'), 47.8]
# filtered_data = list(filter(lambda v: not math.isnan(v), raw_data))
# print(filtered_data)


(1, 2, 3) < (1, 2, 4)  # true
[1, 2, 3] < [1, 2, 4]  # true
'ABC' < 'C' < 'Pascal' < 'Python'  # true
(1, 2, 3, 4) < (1, 2, 4)  # true
(1, 2) < (1, 2, -1)
(1, 2, 3) == (1.0, 2.0, 3.0)
(1, 2, ('aa', 'ab')) < (1, 2, ('abc', 'a'), 4)
