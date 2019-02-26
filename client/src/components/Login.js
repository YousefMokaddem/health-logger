import React, {Component} from 'react';

class Login extends Component {
    
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

    login = (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        let headers = new Headers();

        //headers.append('Content-Type', 'text/json'); when also sending a body
        headers.set('Authorization', 'Basic ' + Buffer.from(email + ":" + password).toString('base64'));
        fetch(`/api/users`, {
            method: "GET",
            headers: headers
        })
            //if login successful, id will be returned from the api
            //we want to store this id in the state of the app so that the user can have permission
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
            <form onSubmit={(e) => this.login(e)}>
    
                <h2>Login</h2>
                {/* {this.printErr()} */}
    
                <label htmlFor="email">Email</label>
                <input type="text" name="email"/>
    
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>
    
                <button type="submit">Submit</button>
            </form>
        );
    }    
}

export default Login;