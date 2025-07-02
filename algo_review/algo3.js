//! Longest Substring Without Repeating Characters:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

const s = "abcabcbb";

const getLongestUniqueSubstring = (s) => {
    if (typeof (s) !== 'string') return 'Error!';

    let maxLen = 0;
    let left = 0;
    const seen = new Map();

    for (let right = 0; right < s.length; right++) {
        if (seen.has(s[right]) && seen.get(s[right]) >= left) {
            left = seen.get(s[right]) + 1;
        }
        seen.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}   

console.log(getLongestUniqueSubstring(s))


//! Minimum Window Substring:
// Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
// The window must contain all the characters of t including the correct count for each character.

// Input: s = "ADOBECODEBANC", t = "ABC"
// Output: "BANC"
// Explanation: The minimum window substring is "BANC".

const string = "ADOBECODEBANC";
const t = "ABC";

// TODO: finish the getMinWindowSubstring algoritithm:
const getMinWindowSubstring = (s, t) => {
    // validation of the string arguments: string and the target!
    if (typeof (s) !== 'string' || typeof (t) !== 'string') return 'Error!';

    // Step 1: Create a map for required character counts in t:
    const need = {};
    for (let char of t) {
        need[char] = (need[char] || 0) + 1;
        console.log("need: ", need);
    }
    let have = {};
    let required = Object.keys(need).length;
    let formed = 0;

    // init the left and right at 0;
    let left = 0, right = 0;
    let minLen = Infinity;
    minStart = 0;

    while (right < s.length) {
        let char = s[right];
        have[char] = (have[char] || 0) + 1;

        // if the current char meets its need requirement, increament 'formed':
        if (need[char] && have[char] === need[char]) {
            formed++;
        }
        // try to shrink the window from the left as longs as its valid:
        while (formed === required) {
            // update the min window from the left as long as it is valid:
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            let leftChar = s[left];
            have[leftChar]--;
            if (need[leftChar] && have[leftChar] < need[leftChar]) {
                formed--;
            }
            left++;
        }
        right++;
    }
    return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);

}

console.log(getMinWindowSubstring(string, t));

//! Summary of the above Minimum Window Substring function:
/*
Summary: Minimum Window Substring (Sliding Window Technique)
-----------------------------------------------------------
- Build a map 'need' of required character counts from t.
- Use two pointers (left and right) to define a sliding window over s.
- Expand the window by moving right, updating counts in 'have'.
- When all needed chars are matched (formed === required), 
- try to shrink the window from the left to find the minimum length.
- Update the minimum window each time a smaller valid window is found.
- Return the smallest window substring found; return "" if none found.
Time Complexity: O(|s| + |t|) due to one pass through s and building the need map.
Space Complexity: O(|s| + |t|) for the maps.
*/

