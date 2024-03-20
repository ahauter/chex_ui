import React from 'react';
import trash_can from '../../assets/trash_can.png';
import save_icon from '../../assets/save_icon.png';
import { pieceImages } from '../../utils/pieceImages';
import styles from './styles.module.css'

export default function PieceSelect({handleSelect, handleSave}) {
  return <div className={styles.buttonContainer}>
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
    <div key="Save">
      <button onClick={() => handleSave()}>
        <img
          className={styles.pieceImage}
          alt={"Save Scenario"}
          src={save_icon}
        />
      </button>
    </div>
    <div key="Remove">
      <button onClick={() => handleSelect("remove")}>
        <img
          className={styles.pieceImage}
          alt={"Remove piece"}
          src={trash_can}
        />
      </button>
    </div>
  </div>;
}
