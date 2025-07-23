//! Dynamic Programming is an algorithmic technique used to solve optimization problems by breaking them down into simpler overlapping subproblems. i.e. Bottom-UP and/ or Top-Down approaches:

//* NAIVE: solution to fibonacci sequence!
//* NOTE: the below solution is not optimal and should be avoided at all times like a plague! You have been warned!
const fiboNaive = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fiboNaive(n - 1) + fiboNaive(n - 2);
}

console.log(fiboNaive(7));

//* Top-Down with Memoization, memo = {} is initialized once so it does not repeat itself or call itself in order to avoid bugs:
const fiboMemo = (n, memo = {}) => {
    //^ edge cases in order to catch if n argh is either 0 and/or 1 which is return its respected correct fibo sequence:
    if (n === 0) return 0;
    if (n === 1) return 1;

    if (n in memo) return memo[n];
    memo[n] = fiboMemo(n - 1, memo) + fiboMemo(n - 2, memo);
    return memo[n];
}

console.log(fiboMemo(8));

//* Bottom-UP, approach iterative and is considered the fastest for this fibonacci sequence:
const fiboIterative = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;

    // init a dp object:
    let dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n]
}

console.log(fiboIterative(8));

//* Space oriented Iterative Solution:
const fiboSpace = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let prev = 0;
    let curr = 1;

    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }
    return curr;
}

console.log(fiboSpace(7));

//! Climbing stairs, you are climbing the stairs. Which is similar to the Fibonacci sequence problem.

// dp with array and tabulation approach:
const climbingStairs = (n) => {
    if (n <= 2) return n;
    const dp = Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
        dp[i]= dp[i - 1] + dp[i - 2]
    }
    return dp[n];
}

console.log(climbingStairs(3));
console.log(climbingStairs(5));

//! Coin change also another classic problem in DP:

const coins = [1, 2, 5];
const amount = 11;

const getCoinChage = (coins, amount) => {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    
    if (dp[amount] === Infinity) {
        return - 1;
    } else {
        return dp[amount];
    }
}

console.log(getCoinChage(coins, amount));

//! Get the longest increasing subsequence, (LIS).
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
//* exptect output: The LIS is [2,3,7,101], so the answer is 4.

const lengthOfTheLIS = (nums) => {
    // validation of the array object, and length property of the object array to make sure it has elements:
    if (!Array.isArray(nums) || nums.length === 0) return 'Error! Invalid array argh!';
    // init a dp object with Array prototype and nums.length and fill it 1, creating a 'synced' array of dynamic length:
    const dp = Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i - 1; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    // return the Max value with the spreader ... operator, on dp!
    return Math.max(...dp);
}

console.log(lengthOfTheLIS(nums))

//! House rob is also another classic problem in DP technique:
const houses = [2, 7, 9, 3, 1];
// expected output: Explanation: Rob house 1 (2), skip house 2, rob house 3 (9), skip house 4, rob house 5 (1). 2 + 9 + 1 = 12.

const robHouses = (arr) => {
    // if the array is empty just return 0:
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];

    const dp = Array(arr.length).fill(0);
    dp[0] = arr[0];
    // assign the Math.max of the argument 1st and 2nd element whichever is the maximum assign it onto dp array object:
    dp[1] = Math.max(arr[0], arr[1])
    for (let i = 2; i < arr.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
    }
    return dp[arr.length - 1]

}

console.log(robHouses(houses));

//* Space optimized version of the above DP problem:
const robOptimizedSpace = (arr) => {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[i];

    let prev1 = 0;
    let prev2 = 0;

    for (let num of arr) {
        let temp = prev1;
        prev1 = Math.max(prev2 + num, prev1);
        prev2 = temp;
    }
    return prev1;
}

console.log(robOptimizedSpace(houses));

//! Given an integer of array of numbers, find the contiguous (containing at least one number) which has the largest sum and returns its sum.
// Use the Kadane's algorithm to solve the problem of getting the Maximum Subarray.

const nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
//* exptected output is 6, since ->  [4,-1,2,1] has the largest sum = 6:

const getMaxSubArray = (arr) => {
    let maxEndingHere = arr[0];
    let maxSoFar = arr[0];

    for (let i = 1; i < arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}

console.log(getMaxSubArray(nums1))

//! Given two strings, find the minimum number of operations (insert, delete, replace) required to convert one string into the other.
// Edit Distance (Levenshtein Distance):

// Given two strings, find the minimum number of operations (insert, delete, replace) required to convert one string into the other
const minDistance = (word1, word2) => {
    const m = word1.length;
    const n = word2.length;


    // Create a (m+1) x (n+1) DP table, where dp[i][j] is the min distance to convert
    // word1[0..i-1] to word2[0..j-1]
    const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    // init the base cases:
    for (let i = 0; i <= m; i++) dp[i][0] = i; // deletions:
    for (let j = 0; j <= n; j++) dp[0][j] = j; // insertions:

    // building the dp table, and fill the DP table:
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],   //* delete
                    dp[i][j - 1],   //* insert
                    dp[i - 1][j - 1]    //* replace
                );
            }
        }
    }
    return dp[m][n]
}   

console.log(minDistance('horse', 'ros'));
