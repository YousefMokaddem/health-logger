import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class SignUp extends Component {

    state = {
        message: null
    }

    printErr = () => {
        if(this.state.message){
            return(
                <h2>{this.state.message}</h2>
            );
        }
    }

    register = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            email: e.target[0].value,
            password: e.target[1].value
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
                    .then(res =>
                        this.setState({
                            message: res.message,
                            msg: true
                        })
                    );
                }else{
                    this.setState({
                        message: "Successfully registered!",
                        msg: true
                    });
                }
            });
    }
    render(){
        return(
            <div>
                <form onSubmit={(e) => this.register(e)}>
                    <h2>Sign Up</h2>
                    {this.printErr()}

                    <label htmlFor="email">Email</label>
                    <input type="text" name="email"/>
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"/>

                    <button type="submit">Submit</button>
                </form>
                <p>Already have an account? <NavLink to="/">Sign in!</NavLink></p>
            </div>
        );
    }
}

export default SignUp;