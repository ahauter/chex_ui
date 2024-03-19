import React from "react";
import styles from './styles.module.css'

export default function ModeSelect({ modeOptions, selectedMode, setMode }) {

    return <div class={styles.container}>
        {modeOptions.map((opt) => <div >
            <button
                className={opt === selectedMode ? styles.selected : styles.button}
                onClick={() => setMode(opt)}>
                {opt}
            </button>
        </div>)
        }
    </div >
}