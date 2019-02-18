import React from 'react';
import {NavLink} from 'react-router-dom';
const Food = ({name, calories, fat, carbs, protein, img, id, unmountFood, index}) => {
    const deleteFood = () => {
        fetch(`/delete/${id}`);
        unmountFood(index);
    }
    return(
        <div className="food-card">
            <img src={img} alt={name}/>
            <h2>{name}</h2>
            <p>Calories: {calories}</p>
            <p>Fat: {fat}</p>
            <p>Carbohydrates: {carbs}</p>
            <p>Protein: {protein}</p>
            <button onClick={() => deleteFood()}>Delete</button>
            <NavLink to={`/edit/${id}`}><button>Edit</button></NavLink>
        </div>
    );
}

export default Food;