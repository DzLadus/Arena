import React from 'react';
import Info from '../components/Info';
import Unit from '../logic/units/Unit';

type MyProps = {
    priorityQueue: Unit[],
    toggle: any
};

export default class InfoContainer extends React.Component<MyProps>{
    constructor(props: MyProps){
        super(props);
    }
    
    render(){
        return(
            <Info priorityQueue={this.props.priorityQueue} toggle={this.props.toggle}/>
        )
    }
}