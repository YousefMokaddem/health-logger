import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class SignUp extends Component {

    state = {
        message: null
    }

    printErr = () => {
        if(this.state.message){
            return(
                <p>{this.state.message}</p>
            );
        }
    }

    register = (e) => {
        e.preventDefault();
        if(e.target[2].value.length < 6 || e.target[2].value.length > 12){
            this.setState({
                message: "Password must be between 6 and 12 characters"
            });
            return;
        }
        if(e.target[2].value !== e.target[3].value){
            this.setState({
                message: "Passwords must match"
            });
            return;
        }
        let data = JSON.stringify({
            username: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        });

        fetch(`/api/users`, {
            method: "POST",
            body: data,
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.status !== 201){
                    return res.json()
                    .then(res => {
                        const message = res.message.split('Validation error: ');
                        this.setState({
                            message: message
                        })
                    }
                    );
                }else{
                    this.setState({
                        message: "Successfully registered!"
                    });
                    this.props.history.push('/');
                }
            });
    }
    render(){
        return(
            <div>
                <form onSubmit={(e) => this.register(e)}>
                    <h2>Sign Up</h2>
                    {this.printErr()}

                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"/>

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email"/>
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"/>

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword"/>

                    <button type="submit">Submit</button>
                </form>
                <p>Already have an account? <NavLink to="/">Sign in!</NavLink></p>
            </div>
        );
    }
}

export default SignUp;