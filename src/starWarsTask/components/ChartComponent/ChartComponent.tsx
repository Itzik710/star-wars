import React from 'react';
import {Bar} from "./Model";
import styles from "./ChartComponent.module.css"

interface ChartComponentProps {
    bars: Bar[]
}

const ChartComponent: React.FC<ChartComponentProps> = (props) => {
    props.bars.sort((a, b) => a.value < b.value ? -1 : a.value > b.value ? 1 : 0);

    const getBars = props.bars.map(bar => (
        <div
            key={bar.key}
            className={styles.bar}
        >
            <div className={styles.barValue}>{bar.value}</div>
            <div
                className={styles.barRectangle}
                style={{height: `${Math.log10(bar.value) * 10}px`}}
            />
            <div className={styles.barKey}>{bar.key}</div>
        </div>
    ));

    return (
        <div
            data-testid="ChartComponent"
            className={styles.bars}
        >
            {getBars}
        </div>
    )
};

export default ChartComponent;
