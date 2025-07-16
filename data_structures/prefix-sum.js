
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
    let n = arr.length;
    console.log('n length: ', n);
    
    //* init the prefix sum as an object of sum: 0 and idx: -1 count:
    let prefixSum = [{ sum: 0, idx: -1 }];
    let sum = 0;

    // loop the argument array:
    for (let i = 0; i < n; i++) {
        // log the results to see if the array is looped:
        console.log(arr[i]);
        // store all of the elements of the argument array in sum:
        sum += arr[i];
        prefixSum.push({ sum: sum, idx: i });
    }

    // sort the prefix sum by value:
    prefixSum.sort((a, b) => a.sum - b.sum);

    let minDiff = Infinity;
    let result = [0, 0];

    // compare the adjacent pairs in the sorted prefixSums:
    for (let i = 1; i < prefixSum.length; i++) {
        let diff = Math.abs(prefixSum[i].sum - prefixSum[i - 1].sum);
        if (diff < minDiff) {
            minDiff = diff;
            // get the original indices:
            let idx1 = prefixSum[i].idx;
            let idx2 = prefixSum[i - 1].idx;

            //* the subarray is from min (idx1, idx2) + 1 to max(idx1, idx2):
            let left = Math.min(idx1, idx2) + 1;
            let right = Math.max(idx1, idx2);
            // reassign left and right of the Math.min and Math.max to the result array:
            result = [left, right];
        }
    }
    return result;
}

console.log(getSumClosestToZero(nums2));
