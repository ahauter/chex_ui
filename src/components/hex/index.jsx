import React from 'react'
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
export default function Hex({ x, y, size, fill, stroke, strokeWidth }) {
    const angleIncrement = Math.PI / 3;
    const points = Array.from({ length: 6 }).map((_, i) => {
        const angle = angleIncrement * i;
        return [
            Math.round(x + size * Math.cos(angle)),
            Math.round(y + size * Math.sin(angle))
        ]
    });
    const pointsString = points.map(point => point.join(',')).join(' ');
    return <polygon
        points={pointsString}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
    />
}