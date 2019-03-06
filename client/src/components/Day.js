import React,{Component} from 'react';


class Day extends Component {
    state={food:[]}

    componentDidMount(){
        fetch(`/api/days/${this.props.day.id}`,{headers:this.props.user.headers})
            .then(res => res.json())
            .then(day => this.setState({food:day.Food}));
    }

    showFoods(){
        if(this.state.food.length > 0){
            const totalCals = this.state.food.reduce((total, curr)=>{return total + (curr.calories * (curr.amount/100))},0)
            return(
                <div>
                {this.state.food.map((food, i) => {
                    return(
                        <div key={i}>
                            <p>{food.amount} of {food.name} = {food.calories * (food.amount/100)}</p> {/*add buttons to edit amounts or remove foods completely*/}
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
                <button onClick={() => this.props.selectDay(this.props.day)}>Select Day</button>
                {this.showFoods()}
            </div>
        );
    }
}

export default Day;