import React from 'react';
import {NavLink} from 'react-router-dom';
const Header = ({user, day}) => {
    
    const checkUser = () => {
        if(user){
            return(
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/foods">Foods</NavLink>
                <NavLink to="/foods/create">New Food</NavLink>
                <NavLink to="/days">Days</NavLink>
                <NavLink to="/days/create">New Day</NavLink>
                <h3>Welcome {user.email}</h3>
            </nav>
            );
        }
    }

    const checkDay = () => {
        if(day){
            return(
                <h3>Selected day: {day.date}</h3>
            );
        }
    }

    return(
        <div>
            <h1>Health Logger</h1>
            {checkUser()}
            {checkDay()}
        </div>
        
    );
}

export default Header;