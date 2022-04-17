#include <iostream>

int main()
{
    // Functional
    int numberOne(2);
    int numberTwo(2.9); // loses data, not safe

    // Braced
    int numberThree{3};
    // int numberFour{3.6}; /* won't compile on c++ 20*/

    // Assignment
    int numberFive = 4;
    int numberSix = 2.9;
}
