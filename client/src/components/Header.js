import React from 'react';
import {NavLink} from 'react-router-dom';
const Header = () => {
    return(
        <div>
            <h1>Health Logger</h1>
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/foods">Foods</NavLink>
                <NavLink to="/add">Create New Food</NavLink>
            </nav>
        </div>
        
    );
}

export default Header;