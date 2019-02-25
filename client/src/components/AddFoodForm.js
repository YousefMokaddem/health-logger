import React from 'react';

const AddFoodForm = (props) => {
    
    const submitAdd = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            name: e.target[0].value,
            calories: e.target[1].value,
            fat: e.target[2].value,
            carbs: e.target[3].value,
            protein: e.target[4].value,
            img: e.target[5].value
        })
        
        fetch(`/api/foods`, {
            method: "POST",
            body: data,
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then((id) => {
            let food = JSON.parse(data)
            food = {...food, id: id}
            props.addFoodToState(food);
            props.history.push('/foods');
        });
    }

    return(
        <form onSubmit={(e) => submitAdd(e)}>
        
            <label htmlFor="name">Name</label>
            <input type="text" name="name"/>
            
            <label htmlFor="calories">Calories</label>
            <input type="text" name="calories"/>
            
            <label htmlFor="fat">Fat</label>
            <input type="text" name="fat"/>
            
            <label htmlFor="carbs">carbs</label>
            <input type="text" name="carbs"/>
            
            <label htmlFor="protein">Protein</label>
            <input type="text" name="protein"/>

            <label htmlFor="img">Image URL</label>
            <input type="text" name="img"/>

            <input type="submit" value="Add Food"/>
            
        </form>
    );
}

export default AddFoodForm;