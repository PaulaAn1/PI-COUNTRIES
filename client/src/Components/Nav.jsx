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
            <li><Link to={'/addactivity'}><button>Add New Activity</button></Link></li>
        </ul>

    </div>
    </div> 
}

export default Nav;