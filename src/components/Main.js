import React, { useState, useEffect } from 'react'
import "./Main.css";
import Node from './Node'
import Astar from '../aStarAlgorithm/AStar'

const cols = 20
const rows = 35

const NODE_START_ROW = 0
const NODE_START_COL = 0
const NODE_END_ROW = rows - 1
const NODE_END_COL = cols - 1

function Main() {
    const [Grid, setGrid] = useState([])
    const [Path, setPath] = useState([])
    const [VisitedNodes, setVisitedNodes] = useState([])

    //Inizialize grid into the DOM
    useEffect(() => {
        initializeGrid()
    }, [])

    //Create the grid
    const initializeGrid = () => {
        const grid = new Array(cols)
        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(rows)
        }

        createSpot(grid)
        setGrid(grid)
        addNeighboursToSpot(grid)

        const startNode  = grid[NODE_START_COL][NODE_START_ROW]
        const endNode = grid[NODE_END_COL][NODE_END_ROW]
        startNode.wall = false
        endNode.wall = false
        let path = Astar(startNode, endNode)
        setPath(path.path);
        setVisitedNodes(path.visitedNodes)
    }

    //Create a 'spot'
    const createSpot = (grid) => {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new Spot(i,j)
            }
        }
    }

    //Add neighbors to spots
    const addNeighboursToSpot = (grid) => {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j].addNeighbors(grid)
            }
        }
    }

    //Spot constructor
    function Spot(i,j) {
        this.col = i
        this.row = j
        this.start = this.row === NODE_START_ROW && this.col === NODE_START_COL
        this.end = this.row === NODE_END_ROW && this.col === NODE_END_COL
        this.g = 0
        this.f = 0
        this.h = 0
        this.previous = undefined
        this.neighbours = []
        this.wall = false
        if(Math.random(1) < 0.2) this.wall = true
        this.addNeighbors = function(grid) {
            if(this.col < cols - 1) this.neighbours.push(grid[this.col + 1][this.row])
            if(this.col > 0) this.neighbours.push(grid[this.col - 1][this.row])
            if(this.row < rows - 1) this.neighbours.push(grid[this.col ][this.row + 1])
            if(this.row > 0) this.neighbours.push(grid[this.col][this.row - 1])

            // if(this.col > 0 && this.row > 0) this.neighbours.push(grid[this.col - 1][this.row - 1])
            // if(this.col < cols - 1 && this.row > 0) this.neighbours.push(grid[this.col + 1][this.row - 1])
            // if(this.col > 0 && this.row < rows - 1) this.neighbours.push(grid[this.col - 1][this.row + 1])
            // if(this.col < cols - 1 && this.row < rows - 1) this.neighbours.push(grid[this.col + 1][this.row + 1])
        }
    }

    const gridWithNode = (
        <div>
            {Grid.map((col, colIndex) => {
                return (
                    <div key={colIndex} className="grid__col">
                        {col.map((row, rowIndex) => {
                            const {start, end, wall} = row;
                            return (
                                <Node 
                                    key={rowIndex} 
                                    start={start} 
                                    end={end} 
                                    wall={wall}
                                    row={rowIndex} 
                                    col={colIndex}
                                />)
                        })}
                    </div>
                )
            })}
        </div>
    )

    const visualizeShortestPath = (shortestPathNodes) => {
        for(let i = 1; i < shortestPathNodes.length - 1; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = "node node__shortestPath"
            }, 15 * i)
        }
    }

    const visualizePath = () => {
        for(let i = 0; i <= VisitedNodes.length; i++) {
            if(i === VisitedNodes.length) {
                setTimeout(() => {
                    visualizeShortestPath(Path)
                }, 5 * i)
            } else {
                if(i !== 0 && i !== VisitedNodes.length-1){
                    setTimeout(() => {
                        const node = VisitedNodes[i]
                        document.getElementById(`node-${node.row}-${node.col}`).className = "node node__visited"
                    }, 5 * i)
                }
                
            }
        }
    }

    const clearGrid = () => {
        for(let i = 0; i <= VisitedNodes.length; i++) {
            if(i === VisitedNodes.length) {
                for(let i = 1; i < Path.length - 1; i++) {
                    const node = Path[i]
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

    const generateGrid = () => {
        clearGrid()
        initializeGrid()
    }

    const runAlgorithm = () => {
        let path = Astar(Grid[NODE_START_COL][NODE_START_ROW], Grid[NODE_END_COL][NODE_END_ROW])
        setPath(path.path);
        setVisitedNodes(path.visitedNodes)

        visualizePath()
    }

    const testFunct = () => {
        if(Grid[2][2].wall) {
            Grid[2][2].wall = false
        } else {
            Grid[2][2].wall = true
        }
        console.log(":(")
    }

    return (
        <div className="main">
            <div className="main__body">
            <div className="grid">
                {gridWithNode}
            </div>
            </div>
            <div className="main__footer">
                <button onClick={runAlgorithm}>Run Algorithm</button>
                <button onClick={visualizePath}>Vizualize Algorithm</button>
                <button onClick={generateGrid}>Generate New Grid</button>
                <button onClick={clearGrid}>Clear Grid</button>
                <button onClick={testFunct}>do it</button>
            </div>
        </div>
    )
}

export default Main
 