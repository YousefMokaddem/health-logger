import React,{Component} from 'react';

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
                return(
                    <button key={i} onClick={() => this.selectDay(day)}>{day.date}</button>
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