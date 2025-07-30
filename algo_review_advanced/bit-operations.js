//! Bitwise operations work at the binary-level. close to the machine code. Every integer is represented by series 0s and 1s. Bitwise operations manipulate these directly.

//* an example of bitwise operations:
let a = 5; // 0101 in binary
let b = 3; // 0011 in binary

console.log(a & b); // 1 (0001);
console.log(a | b); // 7 (0111);
console.log(a ^ b); // 6 (0110);
console.log(~a); // -1 (inverts all bits: 1111 .... 1010 in two's complement);
console.log(a << 1); // 10 (1010);
console.log(a >> 1) // 2 (0010);

//* check if the number is even, using the bitwise operation and comparison:
function isEven(n) { return (n & 1) === 0 };
console.log(isEven(4));
console.log(isEven(5));

// swap two variables without a temp (XOR swap):
let x = 3, y = 7;
x = x ^ y;
y = x ^ y;
x = x ^ y;
console.log(x, y);

//* get the ith bit(0- indexed from right):
function getBit(n, i) {
    { return (n >> i) & 1; }
}
console.log(getBit(5, 2));

function setBit(n, i) { return n | (1 << i); }
console.log(setBit(5, 1));

function clearBit(n, i) { return n & ~(1 << i); }
console.log(clearBit(5, 0)); 

function toggleBit(n, i) { return n ^ (1 << i); }
console.log(toggleBit(5, 0));

//! count the number of 1 bits, (Hamming weight, Brian Kernighan's algo):
function countBits(n) {
    let count = 0;
    while (n) {
        n &= (n - 1);
        count++;
    }
    return count;
}
console.log(countBits(13));

//* Test if n argument is the power of 2!
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
console.log(isPowerOfTwo(8)); 
console.log(isPowerOfTwo(10)); 

//! Advanced technique in bitwise operations:
//* using the bitwise operations find the single number in the array where all other numbers appear twice!

function singleNumber(nums) {
    let result = 0;
    for (let n of nums) result ^= n;
    return result;
}

console.log(singleNumber([2, 3, 5, 2, 3]))

//! find the only missing number from 0..n:
function missingNumber(arr) {
    let n = arr.length;
    let xorAll = 0;
    let xorArr = 0;
    for (let i = 0; i <= n; i++) xorAll ^= i;
    for (let num of arr) xorArr ^= num;
    return xorAll ^ xorArr;
}

console.log(missingNumber([3, 0, 1])) // 2 is the missing number that is in sequence:

//! bitmasking for subsets, Generate all of the possible subsets (Advanced / combinatronics!):
function subsets(arr) {
    let result = [];
    let n = arr.length;
    for (let mask = 0; mask < (1 << n); mask++) {
        let subset = [];
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) subset.push(arr[i]);
        }
        result.push(subset);
    }
    return result;
}

console.log(subsets([1,2,3]));