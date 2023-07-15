import './App.css';
import Board from './components/board';
import React from 'react';
import useGameState from './hooks/gameState';
import { useState } from 'react';

const makePieceArray = (starting_position) => {
  // we make an array with 3 indexs, one for each coordinate 
  // and we fill it with empty strings
  let pieceArray = new Array(6);
  for (let i = 0; i < 6; i++) {
    pieceArray[i] = new Array(6);
    for (let j = 0; j < 6; j++) {
      pieceArray[i][j] = new Array(6);
      for (let k = 0; k < 6; k++) {
        pieceArray[i][j][k] = "";
      }
    }
  }
  // we fill the array with the starting position
  for (let piece in starting_position) {
    let piece_pos = starting_position[piece];
    for (let i = 0; i < piece_pos.length; i++) {
      let [co1, co2, co3] = piece_pos[i];
      pieceArray[co1][co2][co3] = piece;
    }
  }
  return pieceArray;
}


function App() {
  const [hexClicked, setHexClicked] = useState(null);
  const [state, dispatch] = useGameState();
  let pieceArray = makePieceArray(state.position);

  const handleClick = (hex) => {
    if (hexClicked === null) {
      setHexClicked(hex);
      return;
    }
    let [co1, co2, co3] = hexClicked;
    let piece = pieceArray[co1][co2][co3];
    if (
      piece === ""
    ) {
      setHexClicked(hex);
    } else {
      dispatch(
        piece,
        hexClicked,
        hex,
      );
      setHexClicked(null);
    }
  }

  return (
    <Board
      width={900}
      height={900}
      hexSize={40}
      piecePositions={pieceArray}
      handleClick={handleClick}
    />
  );
}

export default App;
