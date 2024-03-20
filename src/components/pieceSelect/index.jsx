import React from 'react';
import { pieceImages } from '../../utils/pieceImages';
import styles from './styles.module.css'

export default function PieceSelect({handleSelect}) {
  return <div>
    {Object.entries(pieceImages).map(
      ([pieceName, imageUri]) => <div key={pieceName}>
      <button onClick={() => handleSelect(pieceName)}>
        <img
          className={styles.pieceImage}
          alt={pieceName}
          src={imageUri}
        />
      </button>
      </div>
    )}
  </div>;
}
