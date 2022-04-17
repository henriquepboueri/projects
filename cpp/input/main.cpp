#include <iostream>

int main()
{
    int age;
    std::string name;
    // std::cout << "Enter your age: " << std::endl;
    // std::cin >> age;
    // std::cout << "Enter your name: " << std::endl;
    // std::cin >> name;
    // std::cout << "You are " << name << " and you are " << age << "!" << std::endl;

    // std::cout << "Enter your name and age, separated by space:" << std::endl;
    // std::cin >> name >> age;
    // std::cout << "You are " << name << " and you are " << age << "!" << std::endl;

    std::cout << "Enter you full name:" << std::endl;
    std::getline(std::cin, name);
    std::cout << "You are " << name << " and you are " << age << "!" << std::endl;
}
