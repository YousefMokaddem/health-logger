import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {

    checkUser = () => {
        if(this.props.user){
            return(
            <nav>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/foods">Foods</NavLink>
                <NavLink to="/foods/create">New Food</NavLink>
                <NavLink to="/days">Days</NavLink>
                <NavLink to="/days/create">New Day</NavLink>
                <NavLink to="/signout">Sign Out</NavLink>
                <h3>Welcome {this.props.user.username}</h3>
            </nav>
            );
        }
    }

    checkDay = () => {
        if(this.props.day){
            return(
                <h3>Selected day: {this.props.day.date}</h3>
            );
        }
    }

    render(){
        return(
            <div>
                <h1>Health Logger</h1>
                {this.checkUser()}
                {this.checkDay()}
            </div>
        );

    }
    
}

export default Header;