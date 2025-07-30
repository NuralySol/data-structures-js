//! Queue In Javascript (Functional, No classes), a queue is FIFO, First-in-First-Out.

// A functional approach to queue
const createQueue = () => {
    const arr = [];
    //* NOTE: the keys themselves are unique as keys have to be but also functions which calls another function, Callback Functions:
    return {
        enqueue: (x) => arr.push(x),
        dequeue: () => arr.shift(),
        peek: () => arr[0],
        isEmpty: () => arr.length === 0,
        size: () => arr.length
    };
}

//* create a q object with a function call of createQueue structure for the purpose of FIFO operations:
const q = createQueue();
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
console.log(q.dequeue()); // first one out:
console.log(q.peek()); // 'peek' at the first element in the stack, at index arr[0]:
console.log(q.size()); // get the size of the stach which should be after q.dequeue operation:

//! Heap is a special tree-based structure, most commonly used as a priority queue. It supports efficient insert and extra min-extract-max:

//* functional approach to heap:
function swap(arr, i, j) {
    // swap in place with no memory loss:
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function heapifyUp(heap, i) {
    while (i > 0) {
        let parent = Math.floor((i - 2) / 2);
        if (heap[i] < heap[parent]) {
            // call the function swap defined earlier:
            swap(heap, i, parent); // for minHeap. Use > maxHeap
            i = parent;
        } else break;
    }
}

function heapifyDown(heap, i) {
    let n = heap.length;
    while (2 * i + 1 < n) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let smallest = i;
        if (left < n && heap[left] < heap[smallest]) smallest = left;
        if (right < n && heap[right] < heap[smallest]) smallest = right;
        if (smallest !== i) {
            swap(heap, i, smallest);
            i = smallest;
        } else break;
    }
}

function insert(heap, val) {
    heap.push(val);
    heapifyUp(heap, heap.length - 1);
}

function extractMin(heap) {
    if (heap.length === 0) return undefined;
    const min = heap[0];
    heap[0] = heap.pop();
    heapifyDown(heap, 0);
    return min;
}

// example usage of heap structure created using the functional approach:
let minHeap = [];
insert(minHeap, 3);
insert(minHeap, 1);
insert(minHeap, 5);
console.log(extractMin(minHeap));
console.log(extractMin(minHeap));
console.log(extractMin(minHeap));

//! A Deque allows O(1) insertion and removal at both ends. You can use arrays for simple, dequeue, but note that shift is O(n) in worst case. 
//* wrapping the functions under one object is good clarity:
function createDequeue() {
    const arr = [];
    return {
        addFront: (x) => arr.unshift(x),
        addBack: (x) => arr.push(x),
        removeFront: () => arr.shift(),
        removeBack: () => arr.pop(),
        peekFront: () => arr[0],
        peekBack: () => arr[arr.length - 1],
        isEmpty: () => arr.length === 0
    }
}

// example usage of deqeue:
const dq = createDequeue();

// add to the back:
dq.addBack(10);
dq.addBack(20);
dq.addBack(5);

// peak front and back:
console.log(dq.peekFront());
console.log(dq.peekBack());
console.log(dq.removeFront());
console.log(dq.removeBack());
console.log(dq.isEmpty());
dq.removeFront();
dq.removeBack();
console.log(dq.isEmpty());

//! Monotonic stack & Monotonoc queue
// Monotonic stack is a stack that is always increasing or decreasing. For example, it is used in finding the next greater/smallest element problems.
// Monotonic queue is a queue that maintains elements in sorted order for efficient min/max queries within a window.

//* finding the next greater element within the array:
function nextGreater(nums) {
    const stack = [];
    // create a copy mirror image of n-length filled with -1 with an Array prototype for result operations which maintains dynamic arr n-length:
    const result = Array(nums.length).fill(-1);
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i)
    }
    return result;
}

console.log(nextGreater([2, 1, 2, 4, 3]))

//! Sliding window technique is used for Substring/Subarray problems - i.e. finding the max, min, average unique count in a window.
//* Example usage, Max Sliding Window Maximum (using the deque):

function maxSlidingWindow(nums, k) {
    const deqeue = [];
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        // remove smaller elements from the back of 'queue':
        while (deqeue.length && nums[deqeue[deqeue.length - 1]] < nums[i]) {
            deqeue.pop();
        }
        deqeue.push(i);
        // remove front in out of window:
        if (deqeue[0] <= i - k) deqeue.shift();
        if (i >= k - 1) result.push(nums[deqeue[0]])
    }
    return result;
}

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

//! Disjoint Set / Union Find:
function createUnionFind(n) {
    const parent = Array.from({ length: n }, (_, i) => i);
    function find(x) {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    }
    function union(x, y) {
        let rootX = find(x);
        let rootY = find(y);
        if (rootX !== rootY) parent[rootX] = rootY;
    }
    return { find, union, parent };
}

// Example: Track Connections Between Elements , suppose you have 5 elements (0 to 4) and you want to Union 0 and 1, Union 1 and 2, and Union 3 and 4m, Boolean check if 0 and 2 are connected which, True || check if 0 and 4 are connected which is false:
const uf = createUnionFind(5);
//^ initially, every element is its own parent, i.e.  { parent: [0, 1, 2, 3, 4] } 

// unions of ->: [ 0 and 1, 1 and 2, 3 and 4 ]
uf.union(0, 1);
uf.union(1, 2);
uf.union(3, 4);

// check if the 0 and 2 are connected which should return true:
console.log(uf.find(0) === uf.find(2)) 

// check if 0 and 4 are conntect which should return false:
console.log(uf.find(0) === uf.find(4))

// log the array to see the interal state:
console.log(uf.parent);

//! Trie, as nested Objects, trie is a good data structure for autocompletes i.e. autocomplete of search engines.
//* Trie is often build as a nested object, each property key is a character, pointing to a child node. Use flag like .isEnd to indicate the end of the word. 
// Basic trie implementation with (insert, search and startsWith):
function createTrie() {
    return {} // root node is an empty object:
}

// insert a word into a trie:
function insertTrie(trie, word) {
    if (typeof word !== 'string') throw new Error('word must be a string');
    let node = trie;
    for (let char of word) {
        if (!node[char]) node[char] = {};
        node = node[char];
    }
    node.isEnd = true;
}

// search for a full word:
function search(trie, word) {
    let node = trie;
    for (let char of word) {
        if (!node[char]) return false;
        node = node[char];
    }
    return !!node.isEnd;
}

// check if any word in the trie starts with a prefix:
function startsWith(trie, prefix) {
    let node = trie;
    for (let char of prefix) {
        if (!node[char]) return false;
        node = node[char]
    }
    return true;
}

const trie = createTrie();
insertTrie(trie, 'cat');
insertTrie(trie, 'car');
insertTrie(trie, 'dog');

//* Log results of trie functional approach:
console.log(search(trie, 'cat'));     
console.log(search(trie, 'ca'));      
console.log(startsWith(trie, 'ca'));  
console.log(startsWith(trie, 'do'));  
console.log(search(trie, 'doge'));    

//! the structure of trie, in the above example with nested objects:
// root
// ├── c
// │   └── a
// │       ├── t (isEnd)
// │       └── r (isEnd)
// └── d
//     └── o
//         └── g (isEnd)