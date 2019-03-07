import React,{Component} from 'react';
import Day from './Day';

class Days extends Component {
    state={
        days:[]
    }

    componentDidMount(){
        this.reFetch();
    }

    populateDays(){
        return(
            this.state.days.map((day,i) => {
                return(//create day component which lists nutrition values, foods, total stats per day in a card with a select day button at the bottom
                    <Day key={i} deleteDay={this.deleteDay.bind(this)} selectDay={this.selectDay.bind(this)} user={this.props.user} day={day}/>
                );
            })
        );
    }

    selectDay(day){
        this.props.selectDay(day);
    }

    deleteDay(day){
        fetch(`/api/days/${day.id}`, {
            method: "DELETE",
            headers: this.props.user.headers
        }).then(res => {
            if(res.status === 200)
                this.reFetch();
        })
    }

    reFetch(){
        fetch('/api/days',{headers:this.props.user.headers})
            .then(res => res.json())
            .then(days => this.setState({days}));
    }

    render(){
        return(
            <div>  
                <h2>Days:</h2>
                {this.populateDays()}
            </div>
        );
    }
}

export default Days;