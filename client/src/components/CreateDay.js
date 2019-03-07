import React,{Component} from 'react';

class CreateDay extends Component {
    state={
        message: null
    }

    printErr = () => {
        if(this.state.message){
            return(
                <p>{this.state.message}</p>
            );
        }
    }

    createDay(e){
        e.preventDefault();

        const data = JSON.stringify({date:e.target[0].value});
        console.log(data);
        fetch('/api/days',{
            method: "POST",
            body: data,
            headers: this.props.user.headers
        }).then(res => {
            if(res.status !== 200){
                return res.json()
                .then(res => {
                    const message = res.message.split("Validation error: ");
                    this.setState({
                        message: message
                    })
                });
            }else{
                this.setState({
                    message: "Successfully created!"
                });
                this.props.history.push('/days');
            }
        });
    }
    render(){
        return(
            <form onSubmit={(e) => this.createDay(e)}>
                <h2>Create New Day</h2>
                {this.printErr()}
                <p>Use yyyy-mm-dd format</p>
                {/* add a date selector */}
                <label htmlFor="date">Date</label>
                <input type="text" name="date"/>
    
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default CreateDay;