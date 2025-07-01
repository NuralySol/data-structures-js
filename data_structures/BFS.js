//^ ALGO TIER LIST: reference pic -> [../assets/AlgoTierList.png] 

// BFS (Breadth first search: uses a queue); it explores neighbors first before going deeper in a tree!

//     A
//    / \
//   B   C
//  / \   \
// D   E   F

// visit order of the BFS is the below:
// A → B → C → D → E → F

const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: [],
    F: []
};

// BFS function using a queue:

const bfs = (start) => {
    const visited = new Set();
    const queue = [start];

    while (queue.length > 0) {
        const node = queue.shift(); 

        if (!visited.has(node)) {
            console.log(node) // process the node:
            visited.add(node);

            for (let neighbor of graph[node]) {
                queue.push(neighbor)
            }
        }
    }
    // convert set to an array for legible log when called:
    return Array.from(visited);
}
const visitedNode = bfs('B');
console.log("Visited order:", visitedNode);

// BFS (Breadth-First Search) traverses a graph level by level, using a queue (FIFO).
// It explores all neighbors at the current depth before moving to the next level.
// BFS is useful for finding the shortest path in unweighted graphs.
