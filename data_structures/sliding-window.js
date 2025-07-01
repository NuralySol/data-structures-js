//! Sliding window: The Sliding Window Technique is a powerful method used to optimize problems involving arrays or lists, especially when you’re working with contiguous subarrays or ranges.

// examples of the sliding window technique:

const nums = [2, 1, 5, 1, 3, 2]; // expected output is 9! 5 + 1 + 3 = 9!
const k = 3;

const maxSubArrayWindow = (arr, k) => {
    // strict validation of the array object argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    let maxSum = 0;
    let windowSum = 0;
    let windowStart = 0;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];

        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[windowStart];
            i++;
        }
    }
    return maxSum;
}

console.log(maxSubArrayWindow(nums, k));

// calculate the averages of the subarray of the size k in the array on n-length:

const arr = [1, 3, 2, 6, -1, 4, 1, 8, 2];
const target = 5;

const getAvgSubarrays = (arr, k) => {
    // strict validation of the array object and k value:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    // init the empty array, windowSum and windowStart vars:
    let result = []
    let windowSum = 0;
    let windowStart = 0;

    // loop through the array:
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        // arr[i] is the windowEnd for this purpose:
        windowSum += arr[i];

        // if the window hits the size of 'k':
        if (i >= k - 1) {
            let average = windowSum / k;
            result.push(average);

            // subtract the element going out of window:
            windowSum -= arr[windowStart];

            // slide the window ahead:
            windowStart += 1;
        }
    }
    return result;
}

console.log(getAvgSubarrays(arr, target))


// Dynamic sized window: Given an array of positive integers and a positive number target, find the length of the smallest contiguous subarray whose sum is greater than or equal to target. Return 0 if no such subarray exists.

const arr1 = [2, 1, 5, 2, 3, 2];
const target1 = 7;

const minSubArrayLen = (arr, k) => {
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;
    
    // init the vars for the dynamic sliding window technique:
    let minLength = Infinity;
    let windowStart = 0;
    let windowSum = 0;

    for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        // log of the elements of the n-length of array:
        console.log(arr[windowEnd]);
        windowSum += arr[windowEnd]; // this expands the window:

        while (windowSum >= k) {
            minLength = Math.min(minLength, windowEnd - windowStart + 1);
            windowSum -= arr[windowStart]; // shrink the window:
            windowStart++;
        }
    }
    // ternary comparison:
    return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen(arr1, target1));


// Given two strings s and p, return a list of all the start indices of p’s anagrams in s.
// You may return the answer in any order.

const s = "cbaebabacd";
const p = "abc";

// "cba" (at index 0) and "bac" (at index 6) are anagrams of "abc";

const findAnagrams = (s, p) => {
    // validation of the input arguments of strings:
    if (s.length < p.length) return [];

    let result = [];
    let pCount = {};
    let windowCount = {};

    // build a frequency map using the for loop in order to track the number of occurances of each elements within a string:
    for (let char of p) {
        pCount[char] = (pCount[char] || 0) + 1;
    }

    const windowSize = p.length;

    // build initial window frequency map:
    for (let i = 0; i < windowSize; i++) {
        let char = s[i];
        windowCount[char] = (windowCount[char] || 0) + 1;
    }

    // call the isEqual helper functio on the initial window:
    if (isEqual(pCount, windowCount)) {
    result.push(0);
    }
    // helper function to compare two frequency maps:
    function isEqual (map1, map2) {
        if (Object.keys(map1).length !== Object.keys(map2).length) return false;
        for (let key in map1) {
            if (map1[key] !== map2[key]) return false;
        }
        return true;
    }

    // compare the first window:
    for (let i = windowSize; i < s.length; i++) {
        const newChar = s[i];
        const oldChar = s[i - windowSize];

        // add newChar to windowCount:
        windowCount[newChar] = (windowCount[newChar] || 0) + 1;

        // remove oldChar from windowCount:
        windowCount[oldChar]--;
        if (windowCount[oldChar] === 0) {
            delete windowCount[oldChar];
        }

        // compare the the maps again:
        if (isEqual(pCount, windowCount)) {
            result.push(i - windowSize + 1)
        }
    }
    return result;
}

console.log(findAnagrams(s, p))

//! Given a string s and an integer k, return the length of the longest substring that contains at most k distinct characters.
const stringAlpha = "eceba";
const kTarget = 2;

// Expected output is 3:
// Explanation: "ece" is the longest substring with 2 distinct characters:

const longestSubstringWithDistinct = (str, k) => {
    if (str.length <= 0 || k === 0) return 0;
    
    let charFreq = new Map();
    let windowStart = 0;
    let maxLength = 0;

    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        const endChar = str[windowEnd];
        charFreq[endChar] = (charFreq[endChar] || 0) + 1;
        
        // shrink the window if we have more than k distinct characters
        while (Object.keys(charFreq).length > k) {
            const startChar = str[windowStart];
            charFreq[startChar]--;
            if (charFreq[startChar] === 0) {
                delete charFreq[startChar];
            }
            windowStart++;
        }
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    return maxLength;
}

console.log(longestSubstringWithDistinct(stringAlpha, kTarget))

