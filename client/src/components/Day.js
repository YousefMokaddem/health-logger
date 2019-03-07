import React,{Component} from 'react';


class Day extends Component {
    state={
        food:[],
        edit:[]
    }

    componentDidMount(){
        this.reFetch();
    }

    deleteFood(id){
        fetch(`/api/foods/${id}`,{
            method: "DELETE",
            headers: this.props.user.headers
        })
        .then(res => {
            if(res.status !== 200){
                return res.json()
                .then(res =>
                    //print error somewhere or redirect to server error page
                    1
                )
            }else{
                this.reFetch();
            }
        });
    }

    triggerEdit(id){
        this.setState(prevState => ({
            edit: (prevState.edit.map((item, i) => (id===i)? true : false))
        }));
    }
    
    editAmount(e, id){
        e.preventDefault();
        const data = JSON.stringify({amount: e.target[0].value});

        fetch(`/api/foods/${id}`, {
            method: "PUT",
            body: data,
            headers: this.props.user.headers
        })
            .then( res => {
                this.setState(prevState => ({
                    edit: (prevState.edit.map(i => false))
                }));
                if(res.status === 204){
                    this.reFetch();
                }
            })
    }

    reFetch(){
        fetch(`/api/days/${this.props.day.id}`,{headers:this.props.user.headers})
            .then(res => res.json())
            .then(day => {
                this.setState({food:day.Food}, () => {
                    let edit = [];
                    for (let i = 0; i<this.state.food.length; i++){
                        edit.push(false);
                    }
                    this.setState({edit: edit});
                });
            });
    }

    showFoods(){
        if(this.state.food.length > 0){
            const totalCals = this.state.food.reduce((total, curr)=>{return total + (curr.calories * (curr.amount/100))},0)
            return(
                <div>
                {this.state.food.map((food, i) => {
                    return(
                        <div key={i}>
                            <p>{food.amount} of {food.name} = {food.calories * (food.amount/100)}</p>
                            <button onClick={() => this.deleteFood(food.id)}>Delete</button>
                            {/* if edit is true, show the form to update amount, else show the edit button */}
                            {this.state.edit[i] ? 
                                <form onSubmit={(e) => this.editAmount(e,food.id)}>
                                    <label>
                                        Amount: <input type="text" name="amount" defaultValue={food.amount} />
                                    </label>
                                    <button type="submit">Submit</button>
                                </form>
                                : 
                                <button onClick={() => this.triggerEdit(i)}>Edit</button>
                            }
                        </div>
                    );
                })}
                
                <p>Total Calories: {totalCals}</p>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                <h2>{this.props.day.date}</h2>
                <button onClick={() => this.props.deleteDay(this.props.day)}>Delete Day</button>
                <button onClick={() => this.props.selectDay(this.props.day)}>Select Day</button>
                {this.showFoods()}
            </div>
        );
    }
}

export default Day;