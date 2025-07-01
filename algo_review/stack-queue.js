//! What is a stack! A stack is a linear data structure that follows LIFO: Last-In, First-Out.

const stack = [];
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());
console.log(stack[stack.length - 1]);
console.log(stack.length === 0); // isEmpty which is false:

//! Advanced monotonic stack (Next Greater Element):

const nums = [1, 3, 5, 6, 10];

// find the next greater element for each item in nums:
const nextGreaterElements = (arr) => {
    if (arr.length <= 1) return 0;
    
    // use the Array object prototype to create a mirror array of n-length value (dynamic)!
    const result = new Array(arr.length).fill('x');
    const stack = [];

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = arr[i];
        }
        stack.push(i)
    }
    return result;
}

console.log(nextGreaterElements(nums));

// Sliding window Maximum:
// Given an array of integers nums and an integer k, there is a sliding window of size k which moves from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position, record the maximum number in the window.

const arr1 = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 3;

// returns max in each sliding window of size k:

const maxSlidingWindow = (arr, k) => {
    const deque = [];
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        while (deque.length && arr[deque[deque.length - 1]] < arr[i]) {
            deque.pop()
        }
        deque.push(i);
        if (deque[0] <= i - k) {
            deque.shift();
        }
        if (i >= k - 1) {
            result.push(arr[deque[0]])
        }   
    }
    return result;
}

console.log(maxSlidingWindow(arr1, k));


// Check if the parentheses are valid or not:
const isValid = (s) => {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.pop() !== pairs[char]) return false;
        }
    }
    return stack.length === 0;
}

console.log(isValid("()[]{}")); 
console.log(isValid("(]"));     
console.log(isValid("{[]}")); 

