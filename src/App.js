import './App.css';
import Board from './components/board';
import React from 'react';
import useGameState from './hooks/gameState';
import { useState } from 'react';
import ModeSelect from './components/modeSelect';

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
  const modes = ["Free Style", "Scenario Builder"]
  const [hexClicked, setHexClicked] = useState(null);
  const [placingPiece, setPiece] = useState("white_king");
  const [removePiece, setRemovePiece] = useState(true);
  const [mode, setMode] = useState(modes[0]);
  const [state, moveDispatch, placeDispatch, removeDispatch] = useGameState();
  let pieceArray = makePieceArray(state.position);
  let handleClick = (hex) => { };
  const handleClickGame = (hex, setHexClicked, dispatch) => {
    if (hexClicked === null) {
      setHexClicked(hex);
      return;
    }
    let [co1, co2, co3] = hexClicked;
    let piece = pieceArray[co1][co2][co3];
    if (piece === "") {
      setHexClicked(hex);
    } else {
      moveDispatch(
        piece,
        hexClicked,
        hex,
      );
      setHexClicked(null);
    }
  }
  const handleRemoveClick = (hex) => {
    let [co1, co2, co3] = hex;
    let piece = pieceArray[co1][co2][co3];
    if (piece === "") {
      return
    }
    removeDispatch(piece, hex)
  }
  const handlePlaceClick = (hex) => {
    console.log(hex)
    if (placingPiece === "") {
      return
    }
    placeDispatch(placingPiece, hex)
  }
  if (mode === "Free Style") {
    handleClick = (hex) => handleClickGame(hex, setHexClicked, moveDispatch)
  } else if (mode === "Scenario Builder") {
    if (removePiece) {
      handleClick = handleRemoveClick
    } else {
      handleClick = handlePlaceClick
    }
  }

  return (<>
    <h1>Welcome to Chex UI</h1>
    <h3>Select a mode to get started</h3>
    <ModeSelect selectedMode={mode} modeOptions={modes} setMode={setMode} />
    <Board
      width={900}
      height={900}
      hexSize={40}
      piecePositions={pieceArray}
      handleClick={handleClick}
    />
  </>);
}

export default App;
