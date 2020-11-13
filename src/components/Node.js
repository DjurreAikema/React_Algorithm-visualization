import React from 'react'
import './Node.css'

export default function Node2({start, end, wall, row, col, onMouseDown, onMouseEnter, onMouseUp}) {
    const cssClasses = start ? "node__start" : end ? "node__end" : wall ? "node__wall" : ""

    return (
        <div 
            id={`node-${row}-${col}`} 
            className={`node ${cssClasses}`} 
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        />
    )
}
