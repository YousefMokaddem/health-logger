import React,{Component} from 'react';

class AddFood extends Component {
    
    addFood(e){
        e.preventDefault();
        const data = JSON.stringify({amount: e.target[0].value});

        fetch(`/api/days/${this.props.day.id}-${this.props.renderProps.match.params.id}`, {
            method: "POST",
            body: data,
            headers: this.props.user.headers
        })
            .then(res => {
                if (res.status === 200){
                    this.props.renderProps.history.push('/foods');
                }
            })
    }

    render(){
        return(
            <form onSubmit={(e) => this.addFood(e)}>
                <label htmlFor="amount">Amount</label>
                <input type="text" name="amount"/>
            </form>
        );
    }
}

export default AddFood;