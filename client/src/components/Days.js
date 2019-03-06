import React,{Component} from 'react';
import Day from './Day';

class Days extends Component {
    state={
        days:[]
    }

    componentDidMount(){
        fetch('/api/days',{headers:this.props.user.headers})
            .then(res => res.json())
            .then(days => this.setState({days}));
    }

    populateDays(){
        return(
            this.state.days.map((day,i) => {
                return(//create day component which lists nutrition values, foods, total stats per day in a card with a select day button at the bottom
                    <Day key={i} selectDay={this.selectDay.bind(this)} user={this.props.user} day={day}/>
                );
            })
        );
    }

    selectDay(day){
        this.props.selectDay(day);
    }

    render(){
        return(
            <div>  
                {this.populateDays()}
            </div>
        );
    }
}

export default Days;