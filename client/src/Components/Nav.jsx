import React from 'react'
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from '../assets/pngegg.png'
import './Nav.css';


const Nav = () => {
    return <div className="container">
    <div className="navbar">
        <Link to='/'>
        <img src={Logo} className="logo" alt="Main Logo" />
        </Link>

        <ul>
            <li><SearchBar /></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/addactivity">Add New Activity</a></li>
        </ul>

    </div>
    </div> 
}

export default Nav;