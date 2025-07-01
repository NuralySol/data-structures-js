//^ ALGO TIER LIST: reference pic -> [../assets/AlgoTierList.png] 

//! DFS data structure (depth first search)!

// DFS using the adjacency list is more space efficient than Node List when using sparse graph and is a good substitute for Node List in the above cases. 

// an example of an adjacency list in contrast to a adjacency matrix!
const graph = {
    A: ['B', 'C'],
    B: ['D'],
    C: ['E'],
    D: [],
    E: ['F'],
    F: []
};

//* recursive DFS function with default visited set argument so that it only calls it once initialized!
const dfsRecursive = (node, visited = new Set()) => {

    if (!node || visited.has(node)) return;

    // log to see if the node argument is being passed on:
    console.log(node);  // process the node:
    visited.add(node);  // mark as visited:

    for (let neighbor of graph[node]) {
        dfsRecursive(neighbor, visited) // visit all of the neighbors
    }
    // return the visited variable Set object!
    return visited;
}

// can pass in different 'A', or 'B', etc arguments with a function call to check the DFS recursive function:
const visitedNodes= dfsRecursive("B");
console.log("Visited nodes:", Array.from(visitedNodes));

//* an iterative approach using the explicit stack, which mimicks the call stack used in recursion:
const dfsIterative = (start) => {
    // init the visited and stack vars for iterative approach:
    const visited = new Set();
    const stack = [start];

    while (stack.length > 0) {
        const node = stack.pop();
        if (!visited.has(node)) {
            visited.add(node);
            console.log(node); // this log will process the node:

            // add neighbors in reverse order to visit left-most first:
            for (let neighbor of [...graph[node]].reverse()) {
                stack.push(neighbor)
            }
        }
    }
    return visited;
}

console.log("Iterative DFS:", Array.from(dfsIterative("B")));