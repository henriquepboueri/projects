#include <iostream>

int main()
{
    // int number1 = 15;         // Decimal
    // int number2 = 017;        // Octal
    // int number3 = 0x0F;       // Hexadecimal
    // int number4 = 0b00001111; // Binary - C++ 14

    // /*int number5{2.9}; // type 'double' cannot be narrowed to 'int' in initializer list [-Wc++11-narrowing]
    // std::cout << number5 << std::endl;*/

    // int number6(2.9); 
    // std::cout << number6 << std::endl;



    // std::cout << number1 + number2 << std::endl; // 30

    std::cout << sizeof(2.9) << std::endl;
    std::cout << sizeof("Hello, world!") << std::endl;
}
