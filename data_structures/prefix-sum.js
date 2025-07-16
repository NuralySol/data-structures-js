
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

//! Longest consecutive sequence:
// nums = [100, 4, 200, 1, 3, 2]
// Output: 4
// The longest consecutive sequence is [1, 2, 3, 4]. Use a hashSet: O(n) complexity!

const nums1 = [100, 4, 200, 1, 3, 2];

const getLongestConSequence = (arr) => {
    // strict validation of the array argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    // feed in the array argument into the set:
    const set = new Set(arr);
    let maxLen = 0;

    for (let num of set) {
        // Only try to build the sequence Starts:
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentLen = 1;

            while (set.has(currentNum + 1)) {
                currentNum += 1;
                currentLen += 1;
            }
            maxLen = Math.max(maxLen, currentLen);
        }
    }
    return maxLen;
}

console.log(getLongestConSequence(nums1));

//! Binary Tree Maximum Path Sum:
//* Maximum path 15 + 20 + 7 = 42:
    //   -10
    //   /  \
    //  9   20
    //     /  \
    //    15   7
    

//! Needs an OOP starter code for the tree structure:
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right
    }
}

//! construct a tree using the class of TreeNode, an instance of the tree(think of the class as an assembly line producing insantiated products) i.e. blueprint of sorts:
const root = new TreeNode(-10,
    new TreeNode(9),
    new TreeNode(20, new TreeNode(15), new TreeNode(7))
)

// logging the tree node of and the structure of it: please reference the above!
console.log("tree: ", root);

//* function to find the Maximum Path Sum of this instance of a tree structure, expected result is: 15 + 20 + 7 = 42!
const getMaxPathSum = (root) => {
    // initiate a maxSum of -Infinity! anything compared to it will be greater value boolean truth:
    let maxSum = -Infinity;

    function helper(node) {
        if (!node) return 0;

        // only consider positive paths in the tree structure instance:
        const left = Math.max(helper(node.left), 0);
        const right = Math.max(helper(node.right), 0);

        // path that splits at this node:
        const splitSum = node.val + left + right;
        maxSum = Math.max(maxSum, splitSum);

        // get the best single path for the parent's recursion:
        return node.val + Math.max(left, right);
    }
    // call the helper function on the 'root' argument:
    helper(root);
    // and return the maxSum so far:
    return maxSum;
}

console.log(getMaxPathSum(root))

