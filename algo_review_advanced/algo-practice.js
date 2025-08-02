//! Algorithm and data structure practice questions, leetcode and concepts:
//* Get two sum using the two pointers technique:

const numbers1 = [1, 2, 5, 7];
const k1 = 9;

// get the two sum of the target within the argument array of numbers1:
const getTWoSum = (arr, k) => {
    //* strict validation of the array object argument and validation of the k number integer target:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! invalid array argh';
    if (typeof (k) !== 'number') return 'Error! Invalid integer number argh';

    // init the left and right pointers of the dynamic n-length array argument object:
    let left = 0;
    let right = arr.length - 1;

    // while loop of left < right until the condtion is met when the sum target of k1 will equal to the sum of pointers and return it:
    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === k1) {
            return [arr[left], arr[right]];
        } else if (sum < k1) {
            // increament the left pointer to move by one left++;
            left++;
        } else {
            // decreament the pointer until the condtion of the sum target is met right--;
            right--;
        }
    }
    // otherwise return that there are not elements that will equal to the sum target:
    return 'No elements in the argument array object that will equal to sum target!';
}

// invoke the function of getTwoSum and pass in the arguments of numbers1, and k1 target:
console.log(getTWoSum(numbers1, k1))

//! Another way of doing the twoSum target is using the built in map object which is also very efficient in look-up and extraction:
const getTwoSumMap = (arr, k) => {
    // strict validation of the array object argh and k integer number:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    // init the seen map object, which will track the seen elements:
    const seen = new Map();

    for (let i = 0; i < arr.length; i++) {
        // log the elements of the array loop so far for tracking purposes in the array argument:
        console.log(arr[i]);
        const complement = k - arr[i];
        if (seen.has(complement)) {
            // return the indices: [index of the current complement, current index]
            return [seen.get(complement), i]
        }
        //* NOTE: that this operation returns the address of the elements where they will equal to sum but not the values themselves, for value return there is a need to modify the function a bit:
        seen.set(arr[i], i)
    }
    // return if no elements have been found to equal to sum target
    return 'No target sum has been found!';
}

// pass in the same argh's as the above function of getTwoSum: numbers1, k1!
console.log(getTwoSumMap(numbers1, k1));

//! Get two Sum using the map and instead return the elements as well as the index addresses:

const numbers2 = [1, 2, 3, 5, 11, 15];
const k2 = 14;

const getTwoSumMapElements = (arr, k) => {
    // strict validation of the array argument object and k target integer value:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    // init the map global object of seen, need also a result = [] object for tracking:
    const seen = new Map();
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        // init the complement:
        const complement = k - arr[i];
        if (seen.has(complement)) {

            for (let j of seen.get(complement)) {
                result.push({
                    indices: [j, i],
                    values: [arr[j], arr[i]]
                })
            }

        }  // store all indices for duplicate elements:
        if (!seen.has(arr[i])) seen.set(arr[i], []);
        seen.get(arr[i]).push(i);
    }
    // return the result array:
    return result;
}

// invoke the function, and this function will return the index values of the sum target as well as the elements themselves which will equal to the given target sum:
console.log(getTwoSumMapElements(numbers2, k2));

//! Set and map object are similar but serve different purpose in data structures in JS language, set is useful for tracking unique elements of the iterable and will never have duplicates (i.e. Social Security Data Base in which every SSN must be unique), but map is good for tracking other elements which may overlap (i.e. blood bank some blood types may overlap A+ to O- assigned to unique people):

//* get the longest consequetive sequence in the array argument:
const nums = [100, 4, 200, 1, 3, 2];
// Explanation: The longest consecutive sequence is [1, 2, 3, 4], which should return 4:

const getMaxSequence = (arr) => {
    // strict validation of the array object:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    // init a set and map objects:
    let numSet = new Set(arr);
    let longest = 0;

    for (let num of numSet) {
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }
            longest = Math.max(longest, currentStreak);
        }
    }
    return longest;
}

console.log(getMaxSequence(nums));

//! get the longest substring without repeating characters:
const lengthOfLongestSubstring = (str) => {
    const seen = new Map();
    let maxLen = 0;
    let left = 0;

    for (let right = 0; right < str.length; right++) {
        if (seen.has(str[right]) && seen.get(str[right]) >= left) {
            left = seen.get(str[right]) + 1;
        }
        seen.set(str[right], right);
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen;
}

//* output examples for the above function of getting the longest substring without repeating characters:
console.log(lengthOfLongestSubstring("abcabcbb")); // Output: 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));    // Output: 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));   // Output: 3 ("wke")