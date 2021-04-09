class Animal(object):
    pass


class Vertebrate(Animal):
    pass


class Fish(Vertebrate):
    # self.name is not defined in Fish class, but is defined in the ClownFish class.
    def __str__(self):
        return "Hello, my name is {}".format(self.name)

    def speak(self):
        return "Blub blub"


class ClownFish(Fish):
    def __init__(self, name):
        self.name = name
        print(self.name)

    def __str__(self):
        return "A ClownFish named "+self.name

    def speak(self):
        return "Blub!"


class TangFish(Fish):
    pass


nemo = ClownFish('Nemo')
print(isinstance(nemo, ClownFish))
print(isinstance(nemo, Vertebrate))
print(isinstance(nemo, Animal))
print(nemo.speak())
