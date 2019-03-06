import React, {Component} from 'react';

class SignIn extends Component {
    
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

    signIn = (e) => {
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value

        let headers = new Headers();

        headers.set('Authorization', 'Basic ' + Buffer.from(email + ":" + password).toString('base64'));
        headers.append('Content-Type', 'application/json');

        fetch(`/api/users`, {
            method: "GET",
            headers: headers
        })
            //if signIn successful, id will be returned from the api
            //we want to store this id in the state of the app so that the user can have permission
            .then(res => {
                if(res.status !== 200){
                    return res.json()
                    .then(res =>
                        this.setState({
                            message: res.message + " - Invalid email or password",
                            msg: true
                        })
                    );
                }else{
                    this.setState({
                        message: "Successfully signed in",
                        msg: true
                    });
                    res.json()
                        .then(res => {
                            this.props.setUser(email, headers, res.id);
                        })
                }
            });
    }

    render(){
        return(
            <form onSubmit={(e) => this.signIn(e)}>
    
                <h2>Sign In</h2>
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

export default SignIn;