//! Advanced algorithm review for JS language

//! Container With Most Water: 
// Given n non-negative integers height where each element represents a point at coordinate (i, height[i]), n vertical lines are drawn such that the two endpoints of the line i are at (i, 0) and (i, height[i]).
//* Find two lines that together with the x-axis form a container, such that the container contains the most water.

// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// The lines at positions 1 and 8 form the container with area 7 * 7 = 49.

//* Visual rep:
//   8 |   █       █
//   7 |   █       █   █
//   6 |   █   █   █   █
//   5 |   █   █   █   █       █
//   4 |   █   █   █   █   █   █
//   3 |   █   █   █   █   █   █
//   2 |   █   █   █   █   █   █   █
//   1 | █ █ █ █ █ █ █ █ █ █ █ █ █ █ █
//     ---------------------------------
//       0 1 2 3 4 5 6 7 8

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];

const getMostWater = (arr) => {
    // strict validation of the array object argument, n-length > 1, every element within the array object must be numbers:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array object!';

    // init the pointers:
    let leftPointer = 0;
    let rightPointer = arr.length - 1;
    let maxArea = 0;

    while (leftPointer < rightPointer) {
        // calculate the area:
        let minHeight = Math.min(height[leftPointer], height[rightPointer]);
        let width = rightPointer - leftPointer;
        let area = minHeight * width;

        if (area > maxArea) {
            maxArea = area;
        }

        // move the pointer at the shorter line inward:
        if (height[leftPointer] < height[rightPointer]) {
            leftPointer ++;
        } else {
            rightPointer--;;
        }
    }
    return maxArea;
}

// invoke the function:
console.log(getMostWater(height));

//! Trapping the rainwater: 
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The elevation map looks like this:
//    _
//  _| |_
// |_|_|_|_|_
// Trapped water is shown as filled areas in the diagram above.
const waterTank = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

const trapRainWater = (arr) => {
    // strict validation of the array object argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array argument!';

    // init the pointers:
    let left = 0;
    let right = arr.length - 1;

    // init the leftMax and rightMax, and totalWater vars: dynamic variables!
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    while (left < right) {
        if (arr[left] < arr[right]) {
            if (arr[left] >= leftMax) {
                leftMax = arr[left];
            } else {
                totalWater += leftMax - arr[left];
            }
            left++;
        } else {
            if (arr[right] >= rightMax) {
                rightMax = arr[right]
            } else {
                totalWater += rightMax - arr[right]
            }
            right--;
        }
    }
    return totalWater;
}

console.log(trapRainWater(waterTank));

//! Remove Duplicates from Sorted Array 

// Input: nums = [1,1,2]
// Output: 2, nums = [1,2,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k.

const nums = [1, 1, 2];

const removeDuplicates = (arr) => {
    // strict validation of the array argument: 
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    // must remove the duplicates in place:
    let k = 1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[k - 1]) {
            arr[k] = arr[i];
            k++;
        }
    }
    return k;
}

console.log(removeDuplicates(nums));

//! get the valid triangle number:
// Input: nums = [2,2,3,4]
// Output: 3
// Explanation: Valid combinations are:
//   - 2, 3, 4 (2+3>4, 3+4>2, 2+4>3)
//   - 2, 3, 4
//   - 2, 2, 3
const nums1 = [2, 2, 3, 4];

const getValidTriangleNums = (arr) => {
    // strict validation of the array argument object:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    // sort in place, if we get an unsorted array:
    arr.sort((a, b) => a - b);

    let n = arr.length;
    let count = 0;

    // this loop starts at the last index and decrements k down to 2, inclusive.
    for (let k = n - 1; k >= 2; k--) {
        console.log(arr[k])
        // init the two pointers:
        let left = 0;
        let right = k - 1;

        while (left < right) {
            if (arr[left] + arr[right] > arr[k]) {
                // all values between left and right will also satisfy the triangle condition:
                count += (right - left);
                right--;
            } else {
                left++;
            }
            
        }
    }
    return count;
}

console.log(getValidTriangleNums(nums1));

//! Number of Subsequences That Satisfy the Given Sum Condition
// Given an array of integers nums and an integer target, return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less than or equal to target.

// Input: nums = [3,5,6,7], target = 9
// Output: 4
// Explanation: There are 4 subsequences that satisfy the condition:
// [3] -> min + max = 3 + 3 = 6 <= 9
// [3,5] -> min + max = 3 + 5 = 8 <= 9
// [3,5,6] -> min + max = 3 + 6 = 9 <= 9
// [3,6] -> min + max = 3 + 6 = 9 <= 9

const nums2 = [3, 5, 6, 7];
const target2 = 9;

const getSumCondition = (arr, k) => {
    // strict validation of the array argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    let n = arr.length;
    const mod = 1000000007;

    let pow2 = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        pow2[i] = (pow2[i - 1] * 2) % mod;
    }

    let left = 0;
    let right = n - 1;
    let count = 0;

    while (left <= right) {
        if (arr[left] + arr[right] <= k) {
            // all subsequences where arr[left] is the minimum and arr[right] is the maximum are valid:
            count = (count + pow2[right - left]) % mod;
            left++;
        } else {
            right--;
        }
    }
    return count;
}

console.log(getSumCondition(nums2, target2));

