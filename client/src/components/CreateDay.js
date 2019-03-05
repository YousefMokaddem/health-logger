import React,{Component} from 'react';

class CreateDay extends Component {
    state={
        message: null
    }

    printErr = () => {
        if(this.state.message){
            return(
                <h2>{this.state.message}</h2>
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
                .then(res =>
                    this.setState({
                        message: res.message
                    })
                );
            }else{
                this.setState({
                    message: "Successfully created!"
                });
            }
        });
    }
    render(){
        return(
            <form onSubmit={(e) => this.createDay(e)}>
                {this.printErr()}
                <h2>Create New Day</h2>
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