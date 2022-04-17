#include <iostream>

int addNumbers(int firstNumber, int secondNumber)
{
    int sum{firstNumber + secondNumber};
    // return firstNumber + secondNumber;
    return sum;
}

int main(int argc, const char **argv)
{
    int first_number{3};
    int second_number{7};
    int sum{3 + 7};
    std::cout << "First number: " << first_number << std::endl;
    std::cout << "Second number: " << second_number << std::endl;
    std::cout << "Sum: " << addNumbers(first_number, second_number) << std::endl;
    return 0;
}
