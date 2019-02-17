import React, {Component} from 'react';
import Food from './Food';

class AllFoods extends Component{

    unmountFood = (i) => {
        this.props.foods[i] = null;
        this.forceUpdate();
    }

    displayFoods = () => {
        return this.props.foods.map((food, i) => {
            if(food !== null){
                return <Food {...food} key={i} index={i} unmountFood={this.unmountFood} />
            }
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

export default AllFoods;