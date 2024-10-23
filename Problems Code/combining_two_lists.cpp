#include <bits/stdc++.h>
using namespace std;

struct Element {
    pair<int, int> positions;
    vector<int> values;
};

class ListMerger {
public:
    ListMerger(vector<Element>& list1, vector<Element>& list2) 
        : list1(list1), list2(list2) {}

    vector<Element> mergeLists() {
        vector<Element> result;
        vector<Element> combinedList = list1;
        combinedList.insert(combinedList.end(), list2.begin(), list2.end());
        sort(combinedList.begin(), combinedList.end(), [](Element& a, Element& b) {
            return a.positions.first < b.positions.first;
        });

        for (size_t i = 0; i < combinedList.size(); ++i) {
            if (result.empty()) {
                result.push_back(combinedList[i]);
            } else {
                Element& last = result.back();
                if (isOverlap(last, combinedList[i])) {
                    last.values.insert(last.values.end(), combinedList[i].values.begin(), combinedList[i].values.end());
                } else {
                    result.push_back(combinedList[i]);
                }
            }
        }
        return result;
    }

private:
    vector<Element> list1, list2;

    bool isOverlap(Element& e1, Element& e2) {
        int overlapLength = min(e1.positions.second, e2.positions.second) - max(e1.positions.first, e2.positions.first);
        int length1 = e1.positions.second - e1.positions.first;
        int length2 = e2.positions.second - e2.positions.first;
        return (overlapLength > length1 / 2 || overlapLength > length2 / 2);
    }
};

int main() {
    vector<Element> list1 = {
        {{1, 5}, {10, 20}},
        {{8, 12}, {30, 40}}
    };
    
    vector<Element> list2 = {
        {{3, 7}, {50, 60}},
        {{10, 15}, {70, 80}}
    };

    ListMerger obj(list1, list2);
    vector<Element> mergedList = obj.mergeLists();

    for (auto& element : mergedList) {
        cout << "[" << element.positions.first << ", " << element.positions.second << "]: ";
        for (int value : element.values) {
            cout << value << " ";
        }
        cout << endl;
    }
}
