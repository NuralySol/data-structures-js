// Dynamic Programming (DP) is a problem-solving technique used in programming and algorithms to solve problems by breaking them down into simpler subproblems, solving each subproblem once, and storing the solution for future use.

// Solving for fibonacci sequeunce is one of the classis DP problems, and there are couple of ways of solving the problem using different DP techniques such as Top-Down Memoization (uses recursion and cache) and Bottom-Up Tabulation (uses an iterative approach).

//^ The formula for the fibonacci sequence is F(n) = F(n - 1) + F(n - 2) aka: the golden ratio!

// Fibo (Memoization)!

//* create a default param of memo to an empty object of {} in order to init the object once and only once:
const fibonacciMemo = (n, memo = {}) => {
    if (n <= 1) return n;

    // memoization approach in solving the fibonacci sequence problem:
    if (memo[n]) return memo[n];
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

console.log(fibonacciMemo(10)); // expected output for 10 is 55!

// Fibo (Tabulation)!

const fibonacciTabulation = (n) => {
    if (n <= 1) return n;
    
    const dp = [0, 1];

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}

console.log(fibonacciTabulation(11)) // expected output for the argument 11 is 89!

// Climbing stairs problem: You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps.
// In how many distinct ways can you climb to the top?

const climbStairs = (n) => {
    if (n <= 2) return n;

    let dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;

    console.log(dp);

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]
}

console.log(climbStairs(3));

//! Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob without alerting the police. You cannot rob two adjacent houses as it will alert the police.

const nums = [2, 7, 9, 3, 1];
// Rob house 1 (2) + house 3 (9) + house 5 (1) = 2 + 9 + 1 = 12

const robHouses = (arr) => {
    // strict validation of the array object:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    let dp = new Array(arr.length);

    dp[0] = arr[0];
    dp[1] = Math.max(arr[0], arr[1]);

    console.log(dp);

    for (let i = 2; i < arr.length; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
    }
    return dp[arr.length - 1];
}   

console.log(robHouses(nums));

// Knapsack problem:
// Determine the maximum total value that can be placed into the knapsack without exceeding the weight capacity.

const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
const capacity = 7;


const knapsack = (weights, values, capacity) => { 
    let n = values.length;

    // Create a (n+1) x (capacity+1) 2D array filled with 0, matrix:
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][capacity]
}

console.log(knapsack(weights, values, capacity))

// Approach: (Bottom up approach)!
//     Build a 2D `dp` table of size (n+1) x (capacity+1), where:
//     dp[i][w] = max value for first i items with max weight w.
//     If item can be taken (weight <= current capacity),
//     decide whether to take it or skip it:
//     dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])
//     If item can’t be taken, carry forward previous max:
//     dp[i][w] = dp[i-1][w]

