#include <iostream>

int addNumbers(int firstNumber, int secondNumber)
{
    return firstNumber + secondNumber;
}

int main(int argc, const char **argv)
{
    int firstNumber = 12;
    int secondNumber = 33;

    int sum = addNumbers(firstNumber, secondNumber);

    std::cout << "Sum is equal to " << sum << std::endl;
    return 0;
}
