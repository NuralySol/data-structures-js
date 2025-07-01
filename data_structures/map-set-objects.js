//! Map and Set global objects (Javascript):

const text = "hello world hello code code hello";
const words = text.split(" ");
const wordCount = new Map();

for (let word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
}

// count how many times each word appears in a string:
console.log(wordCount);

// set example, set only creates unique values:
const tags = ["js", "react", "js", "html", "css", "react"];
const uniqueTags = [...new Set(tags)];
console.log(uniqueTags);

//! an example on how to detect duplicate numbers in a iterable:
const seen = new Set();
const numbers = [1, 2, 3, 4, 5, 1];

for (let num of numbers) {
    if (seen.has(num)) {
        console.log("Duplicate found", num);
        break;
    }
    seen.add(num);
};

// find the intersection of two arrays:
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];

const set1 = new Set(arr1);

// filter the second array by checking membership in the first array:
const intersection = arr2.filter(item => set1.has(item));
console.log(intersection);

//! Union of two arrays:
const arrayA = [1, 2, 3, 4];
const arrayB = [3, 4, 5, 6];

const union = [...new Set([...arrayA, ...arrayB])];
console.log("Union: ", union);

// Advanced Map Example: Character Frequency (Case-Insensitive):
const phrase = 'Hello World';
const charMap = new Map();

for (let char of phrase.toLowerCase()) {
    // regex test:
    if (/[a-z]/.test(char)) { // only count letters:
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
}

console.log('character frequency: ', charMap);

//* group objects by property:
const users = [
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "user" },
    { name: "Charlie", role: "admin" },
    { name: "Dana", role: "user" },
];

const groupByRole = new Map();

for (let user of users) {
    const role = user.role;
    if (!groupByRole.has(role)) {
        groupByRole.set(role, [])
    }
    groupByRole.get(role).push(user.name);
}

console.log(groupByRole);
