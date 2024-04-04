import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from "./Pagination";
import FilterDialog from "./FilterDialog";

const Table = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const columns = ['userId', 'id', 'title', 'body'];
    const [filterValue, setFilterValue] = useState('');
    const [filterColumn, setFilterColumn] = useState('');

    const fetchData = async () => {
        try {
            const params = {
                _sort: sortConfig.key,
                _order: sortConfig.direction,
                _page: currentPage,
                _limit: itemsPerPage,
                q: searchTerm
            }
            if (filterColumn && filterValue) {
                params[filterColumn] = filterValue;
            }
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params
            });
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [currentPage, sortConfig, filterColumn, filterValue]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleFilter = (column, value) => {
        setFilterColumn(column);
        setFilterValue(value);
        setCurrentPage(1);
    };


    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={() => setShowModal(true)}>Filter</button>
            <table>
                <thead>
                <tr className="table-row">
                    <th onClick={() => handleSort('userId')} className="table-header">User ID</th>
                    <th onClick={() => handleSort('id')} className="table-header">ID</th>
                    <th onClick={() => handleSort('title')} className="table-header">Title</th>
                    <th onClick={() => handleSort('body')} className="table-header">Body</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index} style={{borderBottom: '1px solid #ddd'}}>
                        <td className="table-sell">{item.userId}</td>
                        <td className="table-sell">{item.id}</td>
                        <td className="table-sell">{item.title}</td>
                        <td className="table-sell">{item.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems="100"
                paginate={paginate}
            />
            {showModal && (
                <FilterDialog columns={columns} onFilter={handleFilter} onClose={handleCloseModal}/>
            )}
        </div>
    );
};


export default Table;
