import React, { useRef } from "react";
import styles from './styles.module.css'
import Hex from '../hex'

const hexRange = () => Array.from({ length: 6 }).map((_, i) => (i))
const hexPosition = (x, y, size, i, j, k) => {
    const sizeOffest = size * Math.sqrt(3);
    const yOffset = sizeOffest * j - 0.5 * sizeOffest * (i + k);
    const xOffset = 1.5 * size * (k - i);
    return [x + xOffset, y + yOffset]
}
const hexColor = (i, j, k) => {
    const color = (i + j + k) % 3;
    switch (color) {
        case 0:
            return 'lightgrey';
        case 1:
            return 'white';
        default:
            return 'grey';
    }
}
export default function Board({ width, height }) {
    const canvasRef = useRef(null)
    const centerHeight = height / 2
    const centerWidth = width / 2
    const hexSize = 30

    const hexes = hexRange().map(
        i => hexRange(i).map(
            j => hexRange(i, j).map(
                k => {
                    let minNum = Math.min(i, j, k);
                    let co_i = i - minNum
                    let co_j = j - minNum
                    let co_k = k - minNum
                    const [x, y] = hexPosition(centerWidth, centerHeight, hexSize, co_i, co_j, co_k)
                    if (minNum < 1)
                        return <Hex
                            x={x} y={y}
                            size={hexSize}
                            fill={hexColor(i, j, k)}
                            stroke='black'
                            strokeWidth='1'
                            onClick={() => console.log(co_i, co_j, co_k)}
                            key={`${i}${j}${k}`}
                        >
                        </Hex>
                    else return null;
                }
            ).flat()
        ).flat()
    ).flat().filter(hex => hex);

    console.log(hexes.length);
    return <div className={styles.board}>
        <svg
            ref={canvasRef}
            width={width}
            height={height}
        >
            {hexes}
        </svg>
    </div>
}