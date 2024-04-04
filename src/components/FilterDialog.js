import React, { useState } from 'react';

const FilterDialog = ({ columns, onFilter, onClose }) => {
    const [selectedColumn, setSelectedColumn] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const handleFilter = () => {
        onFilter(selectedColumn, filterValue);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <select value={selectedColumn} onChange={e => setSelectedColumn(e.target.value)}>
                    <option value="">Select column</option>
                    {columns.map((column, index) => (
                        <option key={index} value={column}>{column}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Filter value"
                    value={filterValue}
                    onChange={e => setFilterValue(e.target.value)}
                />
                <button onClick={handleFilter}>Apply</button>
            </div>
        </div>
    );
};

export default FilterDialog;
