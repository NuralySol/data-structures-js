
//! Subarray Sum Equals K:
// Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals k.
// Input: nums = [1,2,3], k = 3
// Output: 2
// Explanation: [1,2] and [3] are valid.

const nums = [1, 2, 3];
const k = 3;

const getSubarraySumToK = (arr, k) => {
    // strict validation of the array object argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array argument!';
    if (typeof (k) !== 'number') return 'Error! invalid integer value!';
    
    let count = 0;
    let prefixSum = 0;
    let seen = new Map()
    seen.set(0, 1);

    for (let num of arr) {
        prefixSum += num;

        if (seen.has(prefixSum - k)) {
            count += seen.get(prefixSum - k);
        }
        //^ update the prefixSum in the Map global object:
        seen.set(prefixSum, (seen.get(prefixSum) || 0) + 1)
    }
    return count;
}

console.log(getSubarraySumToK(nums, k))


// Maximum Size Subarray Sum Equals k 
// Given an integer array nums and an integer k, find the length of the longest subarray that sums to k.
// If there isn’t one, return 0.
// Input: nums = [1, -1, 5, -2, 3], k = 3
// Output: 4
// Explanation: The subarray [1, -1, 5, -2] sums to 3 and has length 4.
const arrayNums = [1, -1, 5, -2, 3];
const kTarget = 3;

const maxSubArrayLen = (arr, k) => {
    // strict validation of the array and the k target number:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    // init the initial vars:
    let prefixSum = 0;
    let maxLen = 0;
    let hashMap = new Map();
    //* handle subarrays starting at index 0 with .set(0, -1) assignment to Map() object:
    hashMap.set(0, -1);

    for (let i = 0; i < arr.length; i++) {
        // assign the elements to prefixSum:
        prefixSum += arr[i];

        // if prefixSum - k in seen before, update the maxLen:
        if (hashMap.has(prefixSum - k)) {
            let prevIndex = hashMap.get(prefixSum - k);
            let currLen = i - prevIndex;
            maxLen = Math.max(maxLen, currLen)
        }
        // only store the first occurance of each prefixSum:
        if (!hashMap.has(prefixSum)) {
            hashMap.set(prefixSum, i);
        }
    }
    return maxLen;
}

console.log(maxSubArrayLen(arrayNums, kTarget));

//! Given an integer array nums of length n, find the subarray (contiguous elements) whose sum is closest to zero.
// Return the indices [start, end] (inclusive) of such a subarray. If there are multiple answers, return any one of them.
// Input: nums = [1, 2, -3, 4, 5]
// Output: [0, 2]
// The sum of nums[0:2] (1 + 2 + -3) = 0, which is exactly zero.

const nums2 = [1, 2, -3, 4, 5];

const getSumClosestToZero = (arr) => {
    // strict validation of the array object argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    
}

console.log(getSumClosestToZero(nums2))