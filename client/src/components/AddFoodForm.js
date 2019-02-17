import React from 'react';

const AddFoodForm = () => {
    return(
        <form action="/add" method="post">
        
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