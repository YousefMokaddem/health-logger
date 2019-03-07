import React, {Component} from 'react';
import Food from './Food';

class Foods extends Component{

    state={
        foods:[]
    }
    componentDidMount(){
        this.reFetch();
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
            <div>
                <h2>Foods:</h2>
                <div className="food-grid">
                    {this.displayFoods()}
                </div>
            </div>
        );
    };
    
}

export default Foods;