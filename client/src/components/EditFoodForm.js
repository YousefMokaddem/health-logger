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
        },);
    }
    submitEdit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            name: e.target[0].value,
            calories: e.target[1].value,
            fat: e.target[2].value,
            carbs: e.target[3].value,
            protein: e.target[4].value,
            img: e.target[5].value
        })
        
        fetch(`/byId/${this.state.id}`, {
            method: "PUT",
            body: data,
            headers:{
                'Content-Type': 'application/json'
            }
        });
        this.props.history.push('/foods');
        //update food in state aswell or force to refresh
        let food = JSON.parse(data)
        food = {...food, id: this.state.id}
        this.props.editFoodState(this.state.id, food);
    }
    populateForm = (food) => {
        if(this.state.fetched){
            return(
                <form onSubmit={(e) => this.submitEdit(e)} >
            
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
        }else{
            return(
                <p>Loading...</p>
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