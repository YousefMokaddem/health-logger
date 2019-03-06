import React from 'react';
import {NavLink} from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
const Food = ({name, calories, fat, carbs, protein, img, id, user, reFetch, authorId, day}) => {

    const deleteFood = () => {
        fetch(`/api/foods/${id}`,{
            method: "DELETE",
            headers: user.headers
        })
        .then(res => {
            if(res.status !== 200){
                return res.json()
                .then(res =>
                    //print error somewhere
                    1
                )
            }else{
                reFetch();
            }
        });
    }

    const showAddToDayButton = () => {
        if(day){
            return (<NavLink to={`/days/addfood/${id}`}><button>Add Food to Day</button></NavLink>);
        }
    }
    const showAuthorButtons = () => {
        if(user.id === authorId){
            return(
                <div>
                    <button onClick={() => deleteFood()}>Delete</button>
                    <NavLink to={`/edit/${id}`}><button>Edit</button></NavLink>
                </div>
            );
        }
    }

    return(
        <div className="food-card">
            <ReactImageFallback src={img} fallbackImage="https://www.unesale.com/ProductImages/Large/notfound.png" alt={name}/>
            <h2>{name}</h2>
            <p>Calories: {calories}</p>
            <p>Fat: {fat}</p>
            <p>Carbohydrates: {carbs}</p>
            <p>Protein: {protein}</p>
            {/* only show the delete and edit buttons if foods[i].User.id === user.id*/}
            {showAuthorButtons()}
            {showAddToDayButton()}
        </div>
    );
}

export default Food;