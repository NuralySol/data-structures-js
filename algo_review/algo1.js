//! leetcode style algo review:
let nums = [2, 7, 11, 15]
let target = 9;

// get two sum using the two pointer technique:
const getTwoSum = (arr, k) => {
    // strict validation of the array:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    // init the left and right pointers for two pointer approach:
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        // get the sum of the first and last element within the argument array and compare against the k target:
        const sum = arr[left] + arr[right];
        if (sum === k) {
            return [arr[left], arr[right]]
        } else if (sum <= k) {
            left++
        } else {
            right--;
        }
    }
    // otherwise return if no valid pairs have been found that will equal to sum target:
    return 'no valid pairs have been found that will equal to sum target!';
}

console.log(getTwoSum(nums, target));

//! get two Sum using the map object:
const getTwoSumMap = (arr, k) => {
    // strict validation of the array object and k int arguments:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    const seen = new Map();

    for (let i = 0; i < arr.length; i++) {
        const complement = k - arr[i];
        if (seen.has(complement)) {
            // return the indices: [index of the current complement, current index]
            return [seen.get(complement), i]
        }
        seen.set(arr[i], i)
    }
    // return if no solution has been found:
    return null;
}

console.log(getTwoSumMap(nums, target));

//! Remove the duplicates from Sorted Array:
// Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.
// Do not allocate extra space for another array; you must do this by modifying the input array in-place with O(1) extra memory.

const arrNums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// expected output: 5! since there are five elements within the above array which are duplicates:

const removeDuplicatesSet = (arr) => {
    // strict validation of the array argument object:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    const set = new Set();

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        set.add(arr[i]);
    }
    console.log(set);
    return [...set].length;

}

console.log(removeDuplicatesSet(arrNums));

//! remove the duplicates using the more strict leetcode requirement of inplace operation:
const removeDuplicatesInPlace = (arr) => {
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    // this is a pointer for the place to write the next unique valie:
    let j = 0;

    // start the loop at 1, since the first element by default is always unique:
    for (let i = 1; i < arr.length; i++) {
        console.log(arr[i]);
        // this condition will find only the unqiue values:
        if (arr[i] !== arr[j]) { 
            j = j + 1;
            // move the unique values forward:
            arr[j] = arr[i] 
        } 
    }
    // return the length of values which are copies in the array + 1;
    return j + 1;
}

console.log(removeDuplicatesInPlace(arrNums));

//! Move zeroes:
// Given an array nums, move all 0’s to the end of the array while maintaining the relative order of the non-zero elements.
// You must do this in-place without making a copy of the array.
const arr1 = [0, 1, 0, 3, 12];

const moveZeroes = (arr) => {
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    // init a position to place the next-non-zero:
    let position = 0;

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i] !== 0) {
            arr[position] = arr[i];
            position++;
        }
    }

    // after moving all of the non-zeros, fill the rest with zeros:
    for (let i = position; i < arr.length; i++) {
        console.log(arr[i]);
        arr[i] = 0;
    }
    //* if return is desired return the argument arr:
    return arr;
}

// this is a void function and does not return a value, 
// but if the return is desired just return the argument array which was modified in place with the function!
console.log(moveZeroes(arr1));


//! Contains Duplicate:
// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
// return a boolean:
const arr2 = [1, 2, 3, 1];

const isDuplicated = (arr) => {
    // strict validation of the argument object for length property and each element of object must be a number!
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;

    const set = new Set();

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        set.add(arr[i]);
    }
    //* or instead of using the spread operator you can access the .size property of set global object which acts like a length property:
    if ([...set].length < arr.length) {
        return true;
    } else {
        return false;
    }
}

console.log(isDuplicated(arr2));

//! get the intersection of two arrays:
// Given two integer arrays nums1 and nums2, return an array of their intersection.
// Each element in the result must be unique, and you may return the result in any order.

const nums1 = [1, 2, 2, 1]
const nums2 = [2, 2]

const intersection = (arr1, arr2) => {
    // validation of the array objects:
    if (!Array.isArray(arr1)) return null;
    if (!Array.isArray(arr2)) return null;

    // create an empty set for elememnts in the arr1 argument, which will remove the duplicate elements:
    const set1 = new Set(arr1);
    // this will hold the result:
    const set2 = new Set();

    for (let num of nums2) {
        if (set1.has(num)) {
            set2.add(num);
        }
    }
    return [...set2];
}

console.log(intersection(nums1, nums2))

//! Group anagrams:
// Given an array of strings, group the anagrams together.
// You can return the answer in any order.

const animals = ["eat", "tea", "tan", "ate", "nat", "bat"];
//* expected output: [["eat","tea","ate"],["tan","nat"],["bat"]]

const groupAnagrams = (words) => {
    if (words.length <= 0) return [];

    const map = new Map();
    

    for (let word of words) {
        // sort the word's letters to form a key:
        const key = word.split('').sort().join('');

        // if key is not in the map, then create a new array:
        if (!map.has(key)) {
            map.set(key, [])
        }
        // push the word into the correct group:
        map.get(key).push(word)
    }
    // return all grouped anagrams as an of arrays:
    return Array.from(map.values())
}

console.log(groupAnagrams(animals))

