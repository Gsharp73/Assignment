#include <bits/stdc++.h>
using namespace std;

class HousePriceAnalyzer {
public:
    HousePriceAnalyzer(int years, vector<int>& prices)
        : years(years), prices(prices) {}

    void findMinLoss() {
        unordered_map<int, int> priceMap; 
        int minLoss = INT_MAX;
        int buyYear = -1;
        int sellYear = -1;

        for (int i = 0; i < years; ++i) {
            for (auto& [price, year] : priceMap) {
                if (price > prices[i]) {
                    int loss = price - prices[i];
                    if (loss < minLoss) {
                        minLoss = loss;
                        buyYear = year;
                        sellYear = i + 1;
                    }
                }
            }
            priceMap[prices[i]] = i + 1;
        }

        if (buyYear != -1 && sellYear != -1) {
            cout << "Buy in year: " << buyYear << ", Sell in year: " << sellYear 
                 << ", Minimum Loss: " << minLoss << endl;
        } 
        else {
            cout << "No possible loss." << endl;
        }
    }

private:
    int years;
    vector<int> prices;
};

int main() {
    int years;
    cout << "Enter the number of years: ";
    cin >> years;

    vector<int> prices(years);
    cout << "Enter the prices for each year: ";
    for (int i = 0; i < years; ++i) {
        cin >> prices[i];
    }

    HousePriceAnalyzer analyzer(years, prices);
    analyzer.findMinLoss();
}
