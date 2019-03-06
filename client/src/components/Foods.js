import React, {Component} from 'react';
import Food from './Food';

class Foods extends Component{

    state={
        foods:[]
    }
    componentDidMount(){
        fetch('/api/foods')
        .then(res => res.json())
        .then(res => this.setState({foods:res}));
    }

    reFetch(){
        fetch('/api/foods')
        .then(res => res.json())
        .then(res => this.setState({foods:res}));
    }

    displayFoods = () => {
        return this.state.foods.map((food, i) => {
            return <Food {...food} key={i} user={this.props.user} day={this.props.day} authorId={food.User.id} reFetch={this.reFetch.bind(this)} />
        });
    }
    render(){
        return(
            <div className="food-grid">
                {this.displayFoods()}
            </div>
        );
    };
    
}

export default Foods;