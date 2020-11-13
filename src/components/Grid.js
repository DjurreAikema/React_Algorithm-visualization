import React, { useState, useEffect } from 'react'
import aStar from '../aStarAlgorithm/AStar2'
import Node from './Node2'
import "./Main.css";

//Set the default values for grid generation
const rows = 15
const cols = 30

const NODE_START_ROW = 0
const NODE_START_COL = 0
const NODE_END_ROW = rows - 1
const NODE_END_COL = cols - 1

export default function Grid() {
    //Create the react states
    const [Grid, setGrid] = useState([])
    const [MouseDown, setMouseDown] = useState(false)
    const [Diagonals, setDiagonals] = useState(false)
    const [ShortestPath, setShortestPath] = useState([])
    const [VisitedNodes, setVisitedNodes] = useState([])

    //Initialize the grid when the component loads
    useEffect(() => {
        initializeGrid()
    }, [])

    // useEffect(() => {
    //     visualizeAlgorithm()
    // }, [VisitedNodes, ShortestPath])

    //Make the initial grid
    const initializeGrid = () => {
        const grid = new Array(rows)
        for (let row = 0; row < rows; row++) {
            grid[row] = new Array(cols)
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                grid[row][col] = createNode(row, col)
            }
        }

        setGrid(grid)
    }

    //Create a Node
    const createNode = (row, col) => {
        return {
            col,
            row,
            start: row === NODE_START_ROW && col === NODE_START_COL,
            end: row === NODE_END_ROW && col === NODE_END_COL,
            wall: (Math.random(1) < 0.2 ? true : false),
            g: 0,
            f: 0,
            h: 0,
            previous: undefined
          }
    }

    const handleMouseDown = (row, col) => {
        setGrid(updateGridWalls(Grid, row, col))
        setMouseDown(true)
    }

    const handleMouseEnter = (row, col) => {
        if (!MouseDown) return
        setGrid(updateGridWalls(Grid, row, col))
    }

    const handleMouseUp = () => {
        setMouseDown(false)
    }

    //Update the walls in the grid after a mouse event 
    const updateGridWalls = (grid, row, col) => {
        let newGrid = grid
        let node = newGrid[row][col]
        let newNode = {
          ...node,
          wall: !node.wall
        };
        newGrid[row][col] = newNode
        return newGrid;
    }

    //Run the A* algorithm
    const runAlgorithm = () => { 
        console.log("run")
        const startNode  = Grid[NODE_START_ROW][NODE_START_COL]
        const endNode = Grid[NODE_END_ROW][NODE_END_COL]
        startNode.wall = false
        endNode.wall = false

        let path = aStar(Grid, startNode, endNode, Diagonals)
        setShortestPath(path.path)
        setVisitedNodes(path.visitedNodes)

        return path
    }

    //Visualize the algorithm
    const animateAlgorithm = (path) => {
        console.log("vis")
        console.log(path.visitedNodes)
        console.log(path.path)
        for(let i = 0; i <= path.visitedNodes.length; i++) {
            if(i === path.visitedNodes.length) {
                setTimeout(() => {
                    animateShortestPath(path.path)
                }, 5 * i)
            } else {
                if(i !== 0 && i !== path.visitedNodes.length-1){
                    setTimeout(() => {
                        const node = path.visitedNodes[i]
                        document.getElementById(`node-${node.row}-${node.col}`).className = "node node__visited"
                    }, 5 * i)
                }
                
            }
        }
    }
    
    //Visualize the shortest path
    const animateShortestPath = (shortestPathNodes) => {
        for(let i = 1; i < shortestPathNodes.length - 1; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node__shortestPath"
            }, 15 * i)
        }
    }

    const visualizeAlgorithm = () => {
        let path = runAlgorithm()
        animateAlgorithm(path)
    }

    //Generate new grid
    const generateGrid = () => {
        setGrid([])
        initializeGrid()
    }

    //Undo the animations
    const clearGrid = () => {
        for(let i = 0; i <= VisitedNodes.length; i++) {
            if(i === VisitedNodes.length) {
                for(let i = 1; i < ShortestPath.length - 1; i++) {
                    const node = ShortestPath[i]
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node"
                }
            } else {
                if(i !== 0 && i !== VisitedNodes.length-1){
                    const node = VisitedNodes[i]
                    document.getElementById(`node-${node.row}-${node.col}`).className = "node"
                }
            }
        }
    }

    return (
        
        <div className="main">
            <div className="main__body">
                <div className="grid">
                    <div>
                        {Grid.map((row, rowIndex) => {
                            return (
                                <div key={rowIndex} className="grid__col">
                                    {row.map((node, nodeIndex) => {
                                    const { row, col, start, end, wall } = node;
                                    return (
                                        <Node
                                            key={nodeIndex}
                                            row={row}
                                            col={col}
                                            end={end}
                                            start={start}
                                            wall={wall}
                                            mouseDown={MouseDown}
                                            onMouseDown={(row, col) => handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>handleMouseEnter(row, col)}
                                            onMouseUp={() => handleMouseUp()}
                                        />
                                    );
                                    })}
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="main__footer">
                <button onClick={visualizeAlgorithm}>Vizualize Algorithm</button>
                <button onClick={generateGrid}>Generate New Grid</button>
                <button onClick={clearGrid}>Clear Grid</button>
            </div>
    </div>
    )
}
