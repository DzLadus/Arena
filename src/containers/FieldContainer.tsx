import React from 'react';
import Field from '../components/Field';
import Unit from '../logic/units/Unit';


type Payload = {
    board: Unit[],
    unitInActionPos: number,
    possibleTargets: boolean[],
    priorityQueue: Unit[]
};
type MyProps = {
    row: number,
    col: number,
    payload: Payload,
    toggle: any
};

export default class FieldContainer extends React.Component<MyProps>{
    constructor(props: MyProps){
        super(props);
    }
    
    render(){
        return(
            <Field row={this.props.row} col={this.props.col} payload={this.props.payload} toggle={this.props.toggle}/>
        )
    }
}