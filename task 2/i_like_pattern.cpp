#include <bits/stdc++.h>
using namespace std;

int main()
{
    int N;
    char T;

    /* `cin >> N >> T;` is reading two inputs. The first input is stored in the variable `N`, and the second input is stored in the variable `T`.*/
    cin >> N >> T;

    if (N >= 1 && N <= 26 && (T == 'a' || T == '1'))
    {
        vector<string> pattern(N);

        if (T == 'a')
        {
            // Create the top line
            for (int col = 0; col < N; col++)
            {
                pattern[0] += static_cast<char>('a' + col);
            }

            // Create the middle lines
            for (int row = 1; row < N - 1; row++)
            {
                pattern[row] = static_cast<char>('a' + row) + string(N - 2, ' ') + static_cast<char>('a' + N - row - 1);
            }

            // Create the bottom line
            for (int col = N - 1; col >= 0; col--)
            {
                pattern[N - 1] += static_cast<char>('a' + col);
            }
        }
        else if (T == '1')
        {
            // Create the top line
            for (int col = 1; col <= N; col++)
            {
                pattern[0] += to_string(col);
            }

            // Create the middle lines
            for (int row = 1; row < N - 1; row++)
            {
                pattern[row] = to_string(row + 1) + string(N - 2, ' ') + to_string(N - row);
            }

            // Create the bottom line
            for (int col = N; col >= 1; col--)
            {
                pattern[N - 1] += to_string(col);
            }
        }

        /* This part of the code is using a range-based for loop to iterate over each element in the
        `pattern` vector. */
        for (const string &line : pattern)
        {
            cout << line << endl;
        }
    }
    else
    {
        cout << "invalid input..." << endl;
    }

    return 0;
}
