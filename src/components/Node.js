import React from 'react'
import './Node.css'

export default function Node({start, end, wall, row, col, onMouseDown, onMouseEnter, onMouseUp,}) {
    const cssClasses = start ? "node__start" : end ? "node__end" : wall ? "node__wall" : ""

    return (
        <div 
            className={`node ${cssClasses}`} 
            id={`node-${row}-${col}`} 
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        />
    )
}