//! More algorithm and advanced concepts in JS:

//* Binary Search is an algorithm to find the index of a given element in a sorted array. However, if we were to find the index where we can insert a new element while maintaining the sorted order. 

const searchInsert = (arr, item) => {
    // use the standard strict validation of the array argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return 'Error! Invalid array argh';
    if (typeof (item) !== 'number') return 'Error! Invalid integer argh';

    // init the left and right pointers to 'grab' the array indices:
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // init the mid value of the array:
        const mid = Math.floor((left + right) / 2);

        // item has been found at exactly mid:
        if (arr[mid] === item) return mid;
        if (arr[mid] < item) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}

console.log(searchInsert([1, 3, 5, 6], 5));
console.log(searchInsert([1, 3, 5, 6], 2));
console.log(searchInsert([1, 3, 5, 6], 7));

//! How to find the longest palindromic substring in a JS string?
//* Straight palindrome check function:

const isPalindrome = (str) => {
    const reversed = str.split('').reverse().join('');
    return str = reversed;
}

console.log(isPalindrome('racecar'));
console.log(isPalindrome('abba'));
console.log(isPalindrome('hello'));

//* a more efficient solution is expand from the center:
const expandAroundCenter = (str, left, right) => {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
        left--;
        right++;
    }
    return {
        left: left + 1,
        right: right - 1,
        length: right - left - 1
    }
}

const longestPalindrome = (str) => {
    let best = { left: 0, right: 0, length: 0 };

    for (let i = 0; i < str.length; i++) {
        const currentOdd = expandAroundCenter(str, i, i);
        if (currentOdd.length > best.length) {
            best = currentOdd;
        }

        const currentEven = expandAroundCenter(str, i, i + 1);
        if (currentEven.length > best.length) {
            best = currentEven;
        }
    }
    return str.slice(best.left, best.right + 1);
}

console.log(longestPalindrome('babad'));
console.log(longestPalindrome('cbbd'));

//! What is a matrix in JS? 2D structure, akin to a table in excel with rows and cols:
//* Create custom class object Matrix (using OOP aprroach):

class Matrix {
    // accepts either an array of arrays or an object {rows, cols}
    constructor(data) {
        if (Array.isArray(data)) {
            this.rows = data.length;
            this.cols = data[0].length;
            this.data = data.map(row => [...row]); // copy for safety
        } else if (typeof data === 'object' && 'rows' in data && 'cols' in data) {
            this.rows = data.rows;
            this.cols = data.cols;
            this.fill(0);
        } else {
            throw new Error('Invalid Matrix constructor argument');
        }
    }
    static from({ rows, cols }) {
        return new Matrix({ rows, cols });
    }
    static zeroes({ rows, cols }) {
        return new Matrix({ rows, cols });
    }
    static identity({ size }) {
        return new Matrix(
            Array.from({ length: size }, (_, i) =>
                Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
            )
        );
    }
    fill(value) {
        this.data = Array.from({ length: this.rows }, () =>
            Array.from({ length: this.cols }, () => value)
        );
    }
    copy() {
        return new Matrix(this.data.map(row => [...row]));
    }
}

// examples: 
const m1 = new Matrix([[1, 2], [3, 4]]);
const zeros = Matrix.zeroes({ rows: 2, cols: 3 });
const ident = Matrix.identity({ size: 4 });

console.log(m1.data);
console.log(zeros.data);
console.log(ident.data);
