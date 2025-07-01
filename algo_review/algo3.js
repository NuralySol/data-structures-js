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

const getMinWindowSubstring = (s, t) => {
    // validation of the string arguments: string and the target!
    if (typeof (s) !== 'string' || typeof (t) !== 'string') return 'Error!';

    // Step 1: Create a map for required character counts in t:
    const need = {};
    for (let char of t) {
        need[char] = (need[char] || 0) + 1;
        console.log("need: ", need);
    }

    

}

console.log(getMinWindowSubstring(string, t))

