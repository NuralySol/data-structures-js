// binary search is a searching algoritm that works in an already sorted array to find the element by discarding the half of it i.e. like a phone book search since the phone book is already sorted alphabetically from A to Z: 

// Time complexity: O(log n) — because we cut the search space in half each time.
const arr = [-10, -3, 0, 2, 5, 9, 12]
const k = 9;

const binarySearch = (arr, k) => {
    // strict validation of the array object argument && k target integer argument:
    if (!Array.isArray(arr) || arr.length <= 1 || !arr.every(item => typeof item === 'number')) return arr;
    if (typeof (k) !== 'number') return k;

    // init the two pointers, for index values of the array argument:
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {

        const mid = Math.floor((left + right) / 2)

        if (arr[mid] === k) {
            return mid;
        } else if (arr[mid] < k) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return - 1;
}   

console.log(binarySearch(arr, k));




