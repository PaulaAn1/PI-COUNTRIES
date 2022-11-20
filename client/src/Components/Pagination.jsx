import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../Redux/actions';
import './Pagination.css';

const Pagination = ({ pages, totalCard }) => {
    const dispatch = useDispatch();
    
    const totalPages = Math.ceil((totalCard - 9) / pages) + 1;
    const pageNumbers = [];

    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i + 1);
    } 
    
    return (
    <div className='pagination'>
        <ul>
        {pageNumbers.map(number => (
            <li key={number} className='page-item'>
                <button onClick={() => dispatch(setCurrentPage(number))} className='page-link'>
                    {number}
                </button>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default Pagination;