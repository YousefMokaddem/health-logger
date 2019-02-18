import React, {Component} from 'react';

class EditFoodForm extends Component{
    state = {
        id: this.props.match.params.id,
        fetched: false
    }
    componentDidMount(){
        fetch(`/byId/${this.state.id}`)
        .then(res=>res.json())
        .then(food => {
            this.setState({food:food, fetched:true});
        });
    }
    populateForm = (food) => {
        if(this.state.fetched){
            return(
                <form action={`/byId/${this.state.id}`} method="post">
            
                    <label htmlFor="name">Name</label>
                    <input type="text" defaultValue={food.name} name="name"/>
                    
                    <label htmlFor="calories">Calories</label>
                    <input type="text" defaultValue={food.calories} name="calories"/>
                    
                    <label htmlFor="fat">Fat</label>
                    <input type="text" defaultValue={food.fat} name="fat"/>
                    
                    <label htmlFor="carbs">carbs</label>
                    <input type="text" defaultValue={food.carbs} name="carbs"/>
                    
                    <label htmlFor="protein">Protein</label>
                    <input type="text" defaultValue={food.protein} name="protein"/>
        
                    <label htmlFor="img">Image URL</label>
                    <input type="text" defaultValue={food.img} name="img"/>
    
                    <input type="submit" value="Submit Changes"/>
                
                </form>
            );
        }
    }
    render(){
        return(
            <div>
                {
                    this.populateForm(this.state.food)
                }
            </div>
        );
    };
    
}

export default EditFoodForm;