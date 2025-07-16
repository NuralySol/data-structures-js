//! if the array is Not sorted sorting algorithms come to the rescue, they differ in complexity and also depend on the argument of the array. To find the right algorithm is half ot the battle in order to tackle multitute of problems, and in the end efficiency is all that matters in sorting.

//* classic is a Bubble Sort which compares the adjacent and swaps it out based on the condition:
// NOTE: bubble sort is not used in real code as it is very inefficient sorting algorithm:
const unsortedArray = [1, 5, 2, 3, 9, 6];

const bubbleSort = (arr) => {
    // make a copy:
    let a = arr.slice();
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                // swap in place:
                [a[j], a[j + 1]] = [a[j + 1], a[j]]
            }
        }
    }
    return a;
}

console.log(bubbleSort(unsortedArray))

//! Selection sort repeatedly selects smallest remaining item and puts it into the next position:
// NOTE: Not really used in coding but it is a classic in order to learn sorting concepts:

const selectionSort = (arr) => {
    // make a copy:
    let a = arr.slice();
    for (let i = 0; i < a.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < a.length; j++) {
            if (a[j] < a[minIdx]) minIdx = j;
        }
        // swap in place:
        [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    return a;
}   

console.log(selectionSort(unsortedArray));

//! Insertion sort: builds a sorted array one element at a time, inserting each into the correct position:
// NOTE: Good for small or nearly sorted arrays!

const InsertionSort = (arr) => {
    // make a copy of the array:
    let a = arr.slice();
    for (let i = 0; i < a.length; i++) {
        let key = a[i], j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
    return a;
}

console.log(InsertionSort(unsortedArray));

//! Merge Sort (Divide and Conquer): a very competent sorting algorithm and one of the most important ones!
// It splits recursively, sorts, and merges havles! Great for linked lists, and it is very stable and predictable algorithm!

//* working example of the unsorted array object, it has not been mutated (modified by previous sorting algorithms):
console.log('Unsorted array: ', unsortedArray);

const mergeSort = (arr) => {
    if (arr.length < 2) return arr.slice();
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right)
}

//* helper function merge which will be called in mergeSort main function:
const merge = (left, right) => {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j))
}

// invoke the main function:
console.log(mergeSort(unsortedArray));

//! Quick Sort (Divide and Conquer):
const quickSort = (arr) => {
    if (arr.length < 2) return arr.slice();
    let pivot = arr[0];
    let less = arr.slice(1).filter(x => x <= pivot);
    let more = arr.slice(1).filter(x => x > pivot);
    return quickSort(less).concat([pivot], quickSort(more));
}

console.log(quickSort(unsortedArray))