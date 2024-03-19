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

const empty_position = {
    black_bishop: [],
    black_king: [],
    black_knight: [],
    black_pawn: [],
    black_queen: [],
    black_rook: [],
    white_bishop: [],
    white_king: [],
    white_knight: [],
    white_pawn: [],
    white_queen: [],
    white_rook: [],
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
    for (let i = 0; i < oldPos.length; i++) {
        if (!sameHex(oldPos[i], oldHex)) {
            newPos.push(oldPos[i]);
        }
    }
    newPos.push(newHex);
    new_position[piece] = newPos;
    return new_position;
}

/**
 * 
 * @param {str} piece Name of the piece
 * @param {dict} oldPosition Dictionary of the postions of the pieces
 * @param {Array[3]} newHex Hex where to place the piece 
 */
const placePiece = (piece, oldPosition, newHex) => {
    let new_position = oldPosition;
    const newPos = new_position[piece]
    newPos.push(newHex);
    new_position[piece] = newPos;
    return new_position;
}

/**
 * 
 * @param {str} piece Name of the piece
 * @param {dict} oldPosition Dictionary of the postions of the pieces
 * @param {Array[3]} removeHex Piece on hex will be removed 
 */
const removePiece = (piece, oldPosition, removeHex) => {
    let new_position = oldPosition;
    const newPos = new_position[piece]
    new_position[piece] = newPos.filter(hex => !sameHex(hex, removeHex))
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
            case 'place':
                return {
                    position: placePiece(action.piece, state.position, action.hex),
                };
            case 'remove':
                return {
                    position: removePiece(action.piece, state.position, action.hex),
                };
            case 'clear':
                return {
                    position: { ...empty_position },
                    turn: 'white'
                }
            case 'new_game':
                return {
                    position: { ...starting_position },
                    turn: 'white'
                }
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(
        reducer, {
        position: starting_position,
        turn: 'white',
    });

    const new_game = () => {
        dispatch({
            type: "new_game"
        })
    }

    const clear_board = () => {
        dispatch({
            type: "clear"
        })
    }

    const moveDispatch = (piece, oldHex, nexHex) => {
        dispatch({
            type: 'move',
            piece: piece,
            oldHex: oldHex,
            newHex: nexHex,
        });
    }

    const removeDispatch = (piece, hex) => dispatch({
        type: "remove",
        piece: piece,
        hex: hex
    })

    const placeDispatch = (piece, hex) => dispatch({
        type: "place",
        piece: piece,
        hex: hex
    })
    return [state, new_game, clear_board, moveDispatch, placeDispatch, removeDispatch];
}