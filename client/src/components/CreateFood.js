import React,{Component} from 'react';

class CreateFood extends Component {

    state = {
        solid: true
    }
    
    toggleSolid(e){
        this.setState({solid: e.target.checked});
    }

    checkSolid(){
        return(this.state.solid? <span>g</span> : <span>ml</span>); 
    }

    printErr = () => {
        if(this.state.message){
            return(
                <p>{this.state.message}</p>
            );
        }
    }

    submitAdd(e){
        e.preventDefault();
        let data = JSON.stringify({
            name: e.target[0].value,
            calories: e.target[1].value,
            fat: e.target[2].value,
            carbs: e.target[3].value,
            protein: e.target[4].value,
            img: e.target[5].value,
            isSolid: e.target[6].checked
        })
        
        fetch(`/api/foods`, {
            method: "POST",
            body: data,
            headers: this.props.user.headers
        })
            .then(res => {
                console.log(res.status)
                if (res.status !== 201){
                    res.json()
                        .then(res => {
                            const message = res.message.split("Validation error: ");
                            this.setState({
                                message: message
                            })
                        });
                }else{
                    this.props.history.push('/foods');
                }
            })
        
            
    }

    render(){
        return(
            <form onSubmit={(e) => this.submitAdd(e)}>
                <p>Please fill in nutritional values based on a serving size of 100 {this.checkSolid()}</p>
                {this.printErr()}
            
                <label htmlFor="name">Name</label>
                <input type="text" id="name"/>
                
                <label htmlFor="calories">Calories</label>
                <input type="text" id="calories"/>
                
                <label htmlFor="fat">Fat</label>
                <input type="text" id="fat"/>
                
                <label htmlFor="carbs">carbs</label>
                <input type="text" id="carbs"/>
                
                <label htmlFor="protein">Protein</label>
                <input type="text" id="protein"/>
    
                <label htmlFor="img">Image URL</label>
                <input type="text" id="img"/>
    
                <label htmlFor="isSolid">Solid:</label>
                <input type="checkbox" id="isSolid" onChange={(e) => {this.toggleSolid(e)}} defaultChecked/>
    
                <input type="submit" value="Add Food"/>
                
            </form>
        );
    }
}

export default CreateFood;