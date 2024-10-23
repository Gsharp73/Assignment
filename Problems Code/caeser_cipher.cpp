#include <bits/stdc++.h>
using namespace std;

class CaesarCipher {
public:
    CaesarCipher(int shift) : shift(shift) {}

    string encode(const string& message) {
        return transform(message, shift);
    }

    string decode(const string& message) {
        return transform(message, -shift);
    }

private:
    int shift;

    string transform(const string& message, int shiftValue) {
        string result = "";
        for (char ch : message) {
            if (isalpha(ch)) {
                char base = islower(ch) ? 'a' : 'A';
                ch = (ch - base + shiftValue + 26) % 26 + base;
            }
            result += ch;
        }
        return result;
    }
};

int main() {
    string message;
    int shift, choice;

    cout << "Enter the message: ";
    getline(cin, message);

    cout << "Enter the shift value: ";
    cin >> shift;

    CaesarCipher obj(shift);

    cout << "Choose an option:\n1. Encode\n2. Decode\n";
    cin >> choice;

    if (choice == 1) {
        string encodedMessage = obj.encode(message);
        cout << "Encoded Message: " << encodedMessage << endl;
    } 
    else if (choice == 2) {
        string decodedMessage = obj.decode(message);
        cout << "Decoded Message: " << decodedMessage << endl;
    } 
    else {
        cout << "Invalid choice!" << endl;
    }
}
