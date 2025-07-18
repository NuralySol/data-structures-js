//! Advanced Data structures in JS, and algorithms.

// Practice Algorithms getTwoSum using the two pointer technique one of the classic algo questions:
const nums = [1, 3, 6, 8, 9];

const getTwoSum = (arr, k) => {
    // strict validation of the array argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array argument object!';
    if (typeof (k) !== 'number') return 'Error! Invalid number integer!';
    // init the left and right pointer, indicating the most left index address and the most right index address of the n-length positional:
    let left = 0;
    let right = arr.length - 1;

    // while loop condition for the left and right with the pointer movement:
    while (left < right) {
        // init the sum of element of arr[left] + arr[right]:
        let sum = arr[left] + arr[right];
        // does sum equal to the target value:
        if (sum === k) {
            return [arr[left], arr[right]];
        } else if (sum < k) {
            left++;
        } else {
            right--;
        }
    }
    return 'No valid pairs have been found that will equal to the sum k-target!';
}

//* invoke the function using the console.log('function-call('argh')'):
console.log(getTwoSum(nums, 15));
const twoSumPair15 = getTwoSum(nums, 15);
console.log('Finding sum of 15: ', twoSumPair15);

//! getTwoSum using the Map object, using the same nums array argument:
const getTwoSumMap = (arr, k) => {
    // strict validation of the array argument and the k integer number argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array argh';
    if (typeof (k) !== 'number') return 'Error! Invalid integer argh';

    // init the map object of seen, whill capture the seen elements of the looped elements:
    const seen = new Map();
    // traditional loop to get the values:
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        // init the complement of k - arr[i];
        const complement = k - arr[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(arr[i], i);
    }
    return 'No valid pairs have been found that will equal to the sum target value!';
}

console.log(getTwoSumMap(nums, 15))


//! get ThreeSum:
const nums1 = [-1, 0, 1, 2, -1, -4];
//^ expected output: [[-1,-1,2],[-1,0,1]]:

// function finding 3 elements of subarrays that will equal to 0 in sum:
const getThreeSum = (arr) => {
    // strict validation of the array argument object:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array argh';
    // sort the array argument and make a deep copy w/ a spreader operator:
    const arrCopy = [...arr].sort((a, b) => a - b);
    console.log('arrCopy: ', arrCopy);

    // init the an empty result = [] arr:
    const result = [];

    // using the loop get the first three elements of the sorted array in a copied array:
    for (let i = 0; i < arrCopy.length - 2; i++) {
        console.log(arrCopy[i]);
        if (i > 0 && arrCopy[i] === arrCopy[i - 1]) continue;
        // set left i + 1, and right to the end of the array:
        let left = i + 1;
        let right = arrCopy.length - 1;

        while (left < right) {
            let total = arrCopy[i] + arrCopy[left] + arrCopy[right];

            if (total === 0) {
                result.push([arrCopy[i], arrCopy[left], arrCopy[right]])

                while (left < right && arrCopy[left] === arrCopy[left + 1]) left++;
                while (left < right && arrCopy[right] === arrCopy[right - 1]) right--;

                left++;
                right--;
            } else if (total < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    // return the result subarray finished product:
    return result;
}

console.log(getThreeSum(nums1));
const threeSum = getThreeSum(nums1);
console.log('threeSum: ', threeSum);
const flatened3Sum = threeSum.flat();
console.log('Original array for threeSum: ', nums1);
console.log('flatten the three sum array: ', flatened3Sum);

//! FourSum is also another varation that is more complex in inplementation but follows a similar logical conclusion as the other previous algorithmic solutions:

//* Input: nums = [1,0,-1,0,-2,2], target = 0
// Exptected Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]];

const nums2 = [1, 0, -1, 0, -2, 2];
const target2 = 0;

// function to get fourSum getting every permutations of the elements which will equal to k-target value subarrays of sum:
const getFourSum = (arr, k) => {
    // strict validation of the array argument and k- int value object:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array argh';
    if (typeof (k) !== 'number') return 'Error! Invalid integer argh';

    // sort the array argh that is passed:
    arr.sort((a, b) => a - b);
    console.log('sorted array: ', arr);

    // init an empty result = [];
    let result = [];

    //* loop to get first 4 elements of the since it is get 4Sum function: arr.length - 3 to get the first 4 elements of this argh array!
    for (let i = 0; i < arr.length - 3; i++) {
        console.log(arr[i]);

        // continue to skip duplicates: If i > 0 and nums[i] == nums[i-1] <- Synthax 
        if (i > 0 && arr[i] === arr[i - 1]) continue;

        for (let j = i + 1; j < arr.length - 2; j++) {
            if (j > i + 1 && arr[j] === arr[j - 1]) continue;

            let left = j + 1;
            let right = arr.length - 1;

            while (left < right) {
                // get the total of every element caught so far:
                let total = arr[i] + arr[j] + arr[left] + arr[right];

                if (total === k) {
                    result.push([arr[i], arr[j], arr[left], arr[right]]);

                    while (left < right && arr[left] === arr[left + 1]) left++;
                    while (left < right && arr[right] === arr[right - 1]) right--;
                    left++;
                    right--;
                } else if (total < k) {
                    left++;
                } else {
                    right--;
                }

            }
        }
    }
    return result;
}

console.log(getFourSum(nums2, target2));

//! one of the hardest problems in algorithmic solutions using JS is the Island problem where the matrix structure represents an Island:

// 2D matrix representing the islands 1 being the land and 0 representing the water: cannot reuse the same 1 for another island!
const grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
];

//* expected output of the above representaion of the island is 3 seperate islands: (need a traversal algorithm to solve the problem)!:

// this function will use DFS solution Depth-First-Search algorithm to find all of the islands in the 2D matrix structure!
const numIslandsDFS = (grid) => {
    // if the grid is empty just return 0:
    if (!grid || grid.length === 0) return 0;
    // init initial variables of getting rows and cols and setting the count to 0:
    let count = 0;
    let rows = grid.length;
    let cols = grid[0].length;

    // helper function DFS to mark the Island:
    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') {
            return;
        }
        grid[r][c] = '0' //* mark as visited:
        // recursive call dfs function:
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c)
            }
        }
    }
    return count;
}

console.log(numIslandsDFS(grid))

//! BFS solultion to the number of Islands which is also a valid solution:

const grid1 = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
];

const numIslandsBFS = (grid) => {
    // validation to check if the matrix does not exist or if it does it has no elements thys returning 0 terminating the function:
    if (!grid || grid.length === 0) return 0;

    // init the count, rows and cols in order to 'grab' the 'structure' of the 2D matrix:
    let count = 0;
    //^ the 'grid' structure has 4 rows and 5 columns we grab the cols using the 'drilling' syntax object[0].length:
    let rows = grid.length;
    let cols = grid[0].length;

    // init directions explicit 2D matrix of down, up, right and left directions using the 2d matrix:
    const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ]

    // helper function of BFS:
    function bfs(r, c) {
        const queue = [];
        queue.push([r, c]);
        grid[r][c] = '0'; //^ mark as visisted:

        while (queue.length > 0) {
            const [currR, currC] = queue.shift();
            for (const [dr, dc] of directions) {
                const newR = currR + dr;
                const newC = currC + dc;
                if (
                    newR >= 0 && newR < rows &&
                    newC >= 0 && newC < cols &&
                    grid[newR][newC] === '1'
                ) {
                    queue.push([newR, newC]);
                    grid[newR][newC] = '0' //^ mark as visited: 
                }
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                bfs(r, c)
            }
        }
    }
    return count;
}

console.log(numIslandsBFS(grid1));

//! a More elegant solution to the Island Problem is a something called Union-Find which is elegant but is more tricky to implement:

// re-init the grid2 for Union Find solution of the Island Problem:
const grid2 = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
];

// Union-Find approach requires OOP class structure, with the benefit of it being a more scalable version:
class UnionFind {
    constructor(grid) {
        this.count = 0;
        this.parent = [];
        this.rows = grid.length;
        this.cols = grid[0].length;
        // initialize the parents:
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (grid[r][c] === '1') {
                    this.parent[r * this.cols + c] = r * this.cols + c;
                    this.count++;
                }
            }
        }
    }
    // create custom methods of the class UnionFind:
    find(i) {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    }
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent[rootX] = rootY;
            // DECREAMENT when merging:
            this.count--;
        }
    }
}

//! function that will implement UnionFind solution to the Island Problem:
const numIslandUnionFind = (grid) => {
    if (!grid || grid.length === 0) return 0;
    // init the UnionFind to the class of the UnionFind class, pass in the grid argument which is grid2 object:
    const uf = new UnionFind(grid)
    const rows = grid.length;
    const cols = grid[0].length;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                // try down:
                if (r + 1 < rows && grid[r + 1][c] === '1') {
                    uf.union(r * cols + c, (r + 1) * cols + c);
                }
                // try right:
                if (c + 1 < cols && grid[r][c + 1] === '1') {
                    uf.union(r * cols + c, r * cols + c + 1);
                }
            }
        }
    }
    return uf.count;
}

console.log(numIslandUnionFind(grid2));