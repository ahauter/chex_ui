import { useReducer } from 'react';

const starting_position = {
    black_bishop: [[5, 0, 5], [4, 0, 4], [3, 0, 3]],
    black_king: [[4, 0, 5]],
    black_knight: [[5, 0, 3], [3, 0, 5]],
    black_pawn: [
        [5, 0, 1], [4, 0, 1], [3, 0, 1], [2, 0, 1], [1, 0, 1], [1, 0, 2], [1, 0, 3], [1, 0, 4], [1, 0, 5]
    ],
    black_queen: [[5, 0, 4]],
    black_rook: [[2, 0, 5], [5, 0, 2]],
    white_bishop: [[0, 5, 0], [0, 4, 0], [0, 3, 0]],
    white_king: [[0, 5, 1]],
    white_knight: [[0, 5, 2], [2, 5, 0]],
    white_pawn: [
        [4, 5, 0], [3, 4, 0], [2, 3, 0], [1, 2, 0], [0, 1, 0], [0, 2, 1], [0, 3, 2], [0, 4, 3], [0, 5, 4],
    ],
    white_queen: [[1, 5, 0]],
    white_rook: [[3, 5, 0], [0, 5, 3]],
};

const sameHex = (hex1, hex2) => {
    return hex1[0] === hex2[0]
        && hex1[1] === hex2[1]
        && hex1[2] === hex2[2];
}

/**
 * 
 * @param {str} piece Name of the piece
 * @param {dict} oldPosition Dictionary of the postions of the pieces
 * @param {Array[3]} oldHex Hexagon where the piece is
 * @param {Array[3]} newHex Hex where the piece moves to 
 */
const makeMove = (piece, oldPosition, oldHex, newHex) => {
    let new_position = oldPosition;
    let oldPos = oldPosition[piece];
    let newPos = [];
    console.log("Old piece pos", oldPos);
    console.log("Old hex", oldHex);
    for (let i = 0; i < oldPos.length; i++) {
        if (!sameHex(oldPos[i], oldHex)) {
            newPos.push(oldPos[i]);
        }
    }
    newPos.push(newHex);
    console.log("New piece pos", newPos)
    new_position[piece] = newPos;
    return new_position;
}

export default function useGameState() {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'move':
                return {
                    position: makeMove(action.piece, state.position, action.oldHex, action.newHex),
                    turn: state.turn === 'white' ? 'black' : 'white',
                };
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(
        reducer, {
        position: starting_position,
        turn: 'white',
    });
    const customDispatch = (piece, oldHex, nexHex) => {
        dispatch({
            type: 'move',
            piece: piece,
            oldHex: oldHex,
            newHex: nexHex,
        });
    }
    return [state, customDispatch];
}