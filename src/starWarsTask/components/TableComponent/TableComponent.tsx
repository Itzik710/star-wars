import React from 'react';
import {Row} from "./Model";
import styles from "./TableComponent.module.css"

interface TableComponentProps<T> {
    rows: Row<T>[]
}

const TableComponent: React.FC<TableComponentProps<any>> = (props) => {
    const getRows = () => (
        props.rows.map(row => (
            <tr key={row.key} className={styles.row}>
                <th className={styles.rowKey}>{row.key}</th>
                <td scope="row" className={styles.rowValue}>{row.value}</td>
            </tr>
        ))
    );

    return (
        <div data-testid="TableComponent">
            <table className={styles.table}>
                <thead/>
                <tbody>
                {getRows()}
                </tbody>
            </table>
        </div>
    )
};


export default TableComponent;
