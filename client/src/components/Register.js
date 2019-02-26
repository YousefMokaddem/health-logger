import React, {Component} from 'react';

class Register extends Component {

    state = {
        msg: false,
        message: {}
    }

    printErr = () => {
        if(this.state.msg){
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
                console.log(res);
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
            <form onSubmit={(e) => this.register(e)}>

                {this.printErr()}

                <label htmlFor="email">Email</label>
                <input type="text" name="email"/>
                
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>

                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Register;