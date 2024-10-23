#include <bits/stdc++.h>
using namespace std;

class Convert {
public:
    Convert(double number) : number(number) {}

    string format() {
        string numStr = to_string(number);
        
        size_t decimalPos = numStr.find('.');
        string integerPart = decimalPos != string::npos ? numStr.substr(0, decimalPos) : numStr;
        string decimalPart = decimalPos != string::npos ? numStr.substr(decimalPos) : "";
        
        formatIntegerPart(integerPart);

        return integerPart + decimalPart;
    }

private:
    double number;

    void formatIntegerPart(string& integerPart) {
        int n = integerPart.length();

        if (n > 3) {
            for (int i = n - 3; i > 0; i -= 2) {
                integerPart.insert(i, ",");
            }
        }
    }
};

int main() {
    double number;

    cout << "Enter the number: ";
    cin >> number;

    Convert obj(number);
    string formattedNumber = obj.format();

    cout << "Formatted Indian Currency: " << formattedNumber << endl;

    return 0;
}
