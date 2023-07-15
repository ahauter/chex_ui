import React from 'react'
import { pieceImages } from '../../utils/pieceImages';

/**
 * 
 * @param {x} center of the hex in the x axis
 * @param {y} center of the hex in the y axis
 * @param {size} size of the hex
 * @param {fill} fill color of the hex
 * @param {stroke} stroke color of the hex
 * @param {strokeWidth} stroke width of the hex
 * @returns 
 */
export default function Hex({
    x, y, size,
    fill, stroke, strokeWidth,
    pieceName = "black_king",
    handleClick }) {
    const angleIncrement = Math.PI / 3;
    const points = Array.from({ length: 6 }).map((_, i) => {
        const angle = angleIncrement * i;
        return [
            Math.round(x + size * Math.cos(angle)),
            Math.round(y + size * Math.sin(angle))
        ]
    });
    const pointsString = points.map(point => point.join(',')).join(' ');
    return <a
        onClick={() => handleClick()}
    >
        <polygon
            points={pointsString}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
        />
        {pieceName !== "" && <image
            href={pieceImages[pieceName]}
            x={x - (size / 1.35)}
            y={y - (size / 1.35)}
            height={size * 1.5}
            width={size * 1.5}
        />}
    </a>
}