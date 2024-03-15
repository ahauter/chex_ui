import React, { useRef, useEffect, useState } from "react";
import styles from './styles.module.css'
import Hex from '../hex'

const hexRange = () => Array.from({ length: 6 }).map((_, i) => (i))
const hexPosition = (x, y, size, i, j, k) => {
    const sizeOffest = size * Math.sqrt(3);
    const yOffset = sizeOffest * j - 0.5 * sizeOffest * (i + k);
    const xOffset = 1.5 * size * (k - i);
    return [x + xOffset, y + yOffset]
}
const hexColor = (i, j, k, highlightedHexes) => {
    if (-1 !== highlightedHexes.findIndex(h => {
        return h[0] === i && h[1] === j && h[2] === k
    })) {
        return 'red'
    }
    const color = (i + j + k) % 3;
    switch (color) {
        case 0:
            return 'lightgrey';
        case 1:
            return 'grey';
        default:
            return 'white';
    }
}
export default function Board({
    width, height,
    hexSize,
    piecePositions,
    handleClick
}) {
    const canvasRef = useRef(null)
    const centerHeight = height / 2
    const centerWidth = width / 2
    const [highlightedHexes, setHighLight] = useState([]);

    const onClick = (i, j, k, piece) => {
        const payload = {
            hex: [i, j, k],
            player: piece.substring(0, 5),
            piece: piece ? { [piece.substring(6)]: [i, j, k] } : piece
        }
        console.log(payload)
        fetch("http://localhost:3001/moves", {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then((resp) => resp.json())
            .then((data) => setHighLight(data))
            .catch(err => console.error(err))
        handleClick([i, j, k])
    }


    const hexes = hexRange().map(
        i => hexRange(i).map(
            j => hexRange(i, j).map(
                k => {
                    let minNum = Math.min(i, j, k);
                    let co_i = i - minNum
                    let co_j = j - minNum
                    let co_k = k - minNum
                    let hexC = hexColor(i, j, k, highlightedHexes);
                    const [x, y] = hexPosition(centerWidth, centerHeight, hexSize, co_i, co_j, co_k)
                    const piece = piecePositions[co_i][co_j][co_k];
                    if (minNum < 1)
                        return <Hex
                            x={x} y={y}
                            size={hexSize}
                            fill={hexC}
                            stroke='black'
                            strokeWidth='1'
                            key={`${i}${j}${k}`}
                            pieceName={piece}
                            handleClick={() => onClick(co_i, co_j, co_k, piece)}
                        >
                        </Hex>
                    else return null;
                }
            ).flat()
        ).flat()
    ).flat().filter(hex => hex);

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
