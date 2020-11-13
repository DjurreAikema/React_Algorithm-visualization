function Astar(grid, startNode, endNode, diagonals) {
    let openSet = []        //Nodes that need to be evaluated
    let closedSet = []      //Nodes that have been evaluated
    let path = []           //Shortest path
    let visitedNodes = []   //All nodes visited by the algorithm

    //Starting the algorithm at the start node
    openSet.push(startNode)
    //While there are nodes in the openSet
    while(openSet.length > 0) {
        let lowestIndex = 0

        //Get the node with the lowest index in the openSet
        for(let i = 0; i < openSet.length; i++) {
            if(openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i
            }
        }
        let current = openSet[lowestIndex]
        visitedNodes.push(current)

        //If the end has been reached return the shortestPath and visitedNodes
        if(current === endNode) {
            let temp = current
            path.push(temp)
            while(temp.previous) {
                path.push(temp.previous)
                temp = temp.previous
            }

            return {path, visitedNodes};
        }

        //Put the current node in the closedSet and remove it from the openSet
        closedSet.push(current)
        openSet = openSet.filter((elt) => elt !== current)

        //get the neighbors of the current Node
        let neighbors = getUnvisitedNeighbors(current, grid)


        //Loop over the neighbors of the current node
        for(let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i]
            if(!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1
                let newPath = false
                
                if(openSet.includes(neighbor)) {
                    if(tempG < neighbor.g) {
                        neighbor.g = tempG
                        newPath = true
                    }
                } else {
                    neighbor.g = tempG
                    newPath = true
                    openSet.push(neighbor)
                }

                if(newPath) {
                    neighbor.h = heuristic(neighbor, endNode)
                    neighbor.f = neighbor.g + neighbor.h
                    neighbor.previous = current
                }
                
            }
        }
    }

    //Return all neighbors of a Node that arent in the closeSet
    function getUnvisitedNeighbors(node, grid) {
        const neighbors = [];
        const { row, col } = node;

        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[row].length - 1) neighbors.push(grid[row][col + 1]);

        if(diagonals) {
            if(row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1])
            if(col < grid[row].length - 1 && row > 0) neighbors.push(grid[row - 1][col + 1])
            if(col > 0 && grid.length - 1) neighbors.push(grid[row + 1][col - 1])
            if(col < grid[row].length - 1 && row < grid.length - 1) neighbors.push(grid[row + 1][col + 1])
        }

        return neighbors.filter(neighbor => !closedSet.includes(neighbor));
    }

    //Return an error when the end is unreachable
    return {path, visitedNodes, error: "No path found"}
}

function heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

export default Astar