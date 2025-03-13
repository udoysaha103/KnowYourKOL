import React from 'react'
import styles from "./Star.module.css"
const Star = ({name, roi, pnl}) => {
    return (
        <div className={styles.card}>
            <div className={styles.circle}>
            </div>
            <div className={styles.name}>
                <p>{name}</p>
            </div>
            <div className={styles.footer}>
                <div>
                    <p className={styles.key}>ROI:</p>
                    <p className={styles.value}>{roi}</p> 
                </div>
                <div>
                    <p className={styles.key}>PnL:</p>
                    <p className={styles.value}>{pnl}</p> 
                </div>
            </div>

        </div>
    )
}

export default Star;