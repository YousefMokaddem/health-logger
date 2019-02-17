import React from 'react';
import Food from './Food';

const AllFoods = ({foods}) => {
    let displayFoods = () => {
        return foods.map((food, i) => <Food {...food} key={i}/>);
    }
    return(
        <div className="food-grid">
            {displayFoods()}
        </div>
    );
}

export default AllFoods;