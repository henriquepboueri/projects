#include <iostream> //namespace

consteval int get_value()
{
    return 3;
}

int main(int argc, char **argv)
{
    // std::cout << "Hello, world!" << std::endl;
    // std::cout << "Number1" << std::endl;
    // std::cout << "Number2" << std::endl;
    // std::cout << "Number3" << std::endl;

    // int count = 0;

    // while (count < 10)
    // {
    //     std::cout << "Henrique" << std::endl;
    //     count++;
    // }

    // return 0;

    std::cout << argv << std::endl;

    return 0;
}
