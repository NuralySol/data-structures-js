//! Searching algorithms - is a computational method used to find a specific element within a data structure or a search space. 

// linear search is one of the most classic searching algorithms: 
// NOTE: linear search is slow on large arrays. Time complexity: O(n) time, O(1) space

const numsArr = [1, 2, 3, 5, 100, 11, 30];

const linearSearch = (arr, k) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === k) return i; // if the element being looped on is found return it (the index address):
    }
    // else if not in the array argument return -1;
    return -1;
}

// invoke the linear search on a numsArr and with the target 100 element which exists in the array above:
console.log(linearSearch(numsArr, 100));

//! Binary search is a great divide and conquer searching algorithm that works great on sorted arrays, similar a phonebook analogy by discarding halves when searching for a name in a phonebook since the phonebook is already alphabetized:

const sortedArray = [1, 3, 5, 6, 10, 11, 16];
// Binary search iterative:
const binarySearch = (arr, k) => {
    if (arr.length <= 1) return arr;
    // init the left and right pointer of the array argument:
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // get the mid of the array argument:
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === k) {
            return mid;
        }; // target found at the middle:
        if (arr[mid] < k) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    // esle return -1 if the target element is not found within the array argumentL
    return - 1;
}

console.log(binarySearch(sortedArray, 11));
console.log(binarySearch(sortedArray, 100)); // does not exist:

//! Jump Search (On a sorted Array), is good for large sorted iterables, slower than binary but faster than linear search:

// simulation of a large sorted array compared to previous arrays:
const largeSortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const jumpSearch = (arr, k) => {
    if (arr.length <= 1) return arr;
    if (typeof (k) !== 'number') return k;

    let n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (arr[Math.min(step, n) - 1] < k) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return - 1;
    }

    while (arr[prev] < k) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    if (arr[prev] === k) return prev;
    // not found:
    return - 1;
}

console.log(jumpSearch(largeSortedArray, 10))

//! Trie search is a also another searching algorithm which is common in autocomplete actions, and is widely used in the real world coding:
//* Needs an OOP implementation of the TrieNode class structure to simulate the tree relationship:

class TrieNode {
    constructor() {
        this.children = {}; // Map from character to TrieNode:
        this.isEnd = false; // True if node marks end of word:
    }
}

// class Trie:
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // insert a word into a trie:
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEnd = true;
    }

    // return a true if word is in a trie:
    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEnd;
    }

    // returns true if there is any word in the trie that starts with a given prefix:
    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }
}

//* example usage of Trie:
const trie = new Trie();
trie.insert('cat');
trie.insert('cap');
trie.insert('dog');

console.log(trie.search('cat'));
console.log(trie.search('ca'));
console.log(trie.startsWith('ca'));
console.log(trie.startsWith('do'));
console.log(trie.search('doge'));

