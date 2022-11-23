import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getCountry } from '../Redux/actions';
import './SearchBar.css';


export default function SearchBar() {
    const [country, setCountry] = useState('');
    let dispatch = useDispatch();
    function onSubmit(e) {
        e.preventDefault();
        if(!country) {
            alert('Debes ingresar un país');
        } else {
            dispatch(getCountry(country))
        }
    }

    function onChanging(e) {
        e.preventDefault();
        setCountry(e.target.value)
    }

    function empty(e) {
        setCountry('')
    }
    
    return <div>
            <form onSubmit={onSubmit}>
            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    onChange={onChanging}
                    value={country}
                />
                
                <div className="btn">
                    <i className="fas fa-search icon" onClick={empty}></i>
                </div>
            </div>
            </form>
        </div>

}