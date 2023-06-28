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
            return 'grey';
        case 1:
            return 'red';
        case 2:
            return 'blue';
        default:
            return 'black';
    }
}
export default function Board({ width, height }) {
    const canvasRef = useRef(null)
    const centerHeight = height / 2
    const centerWidth = width / 2
    const hexSize = 30

    const hexes = hexRange().map(
        i => hexRange().map(
            j => hexRange().map(
                k => {
                    const [x, y] = hexPosition(centerWidth, centerHeight, hexSize, i, j, k)
                    return <Hex x={x} y={y} size={hexSize} fill={hexColor(i, j, k)} />
                }
            ).flat()
        ).flat()
    ).flat();
    console.log(hexes);
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