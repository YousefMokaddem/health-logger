import React,{Component} from 'react';

class AddFoodToDay extends Component {
    render(){
        return(
            <form>
                <label htmlFor="amount">Amount</label>
                <input type="text" name="amount"/>
            </form>
        );
    }
}

export default AddFoodToDay;