import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}>
                {pageNumbers.map(number => (
                    <li key={number} style={{ margin: '0 5px' }}>
                        <button onClick={() => paginate(number)} className="pagination">{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Pagination;
