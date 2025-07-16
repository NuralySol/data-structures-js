//! randomness (pseudo?): How to get true randomness?

const nums = [1, 2, 3, 4, 5, 6];

//* Fisher Yates algorithm is more unbiased towards each weighting of the elements on any given iterable, and thus is prefereble than a naive shuffe!
const fisherYatesShuffle = (arr) => {
    // clone the array in order to avoid mutating the original (optional):
    let a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        // pick a random index from 0 to i (inclusive):
        let j = Math.floor(Math.random() * (i + 1));
        // swap elements at positions i and j:
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

console.log(fisherYatesShuffle(nums));

//* if using a 'naive' random shuffle:

const naiveShuffle = (arr) => {
    return arr.slice().sort(() => Math.random() - 0.5);
}

console.log(naiveShuffle(nums));
