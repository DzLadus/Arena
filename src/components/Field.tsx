import React from 'react';
import Unit from '../logic/units/Unit';
import defence from '../img/defence.png';
import paralyze from '../img/paralyze.png';


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

export default class Field extends React.Component<MyProps>{
    constructor(props: MyProps){
        super(props);
    }
    
    render(){

        return(
            <div className="field-container">
                {this.props.payload.board.map((unit, i, board) => {
                    let chosed = "";
                    let dead = "";
                    let possible = "";
                    let isDefenced = "";
                    let isParalyzed = "";
                    let team = ""

                    if(i === this.props.payload.unitInActionPos)
                        chosed=" chosed ";
                    else if(this.props.payload.possibleTargets[i] === true)
                        possible = " possible ";

                    if(unit.healthPoint === 0)
                        dead=" dead ";
                    
                    if(unit.isDefenced){
                        isDefenced = "defenced";
                    } else {
                        isDefenced = "notDefenced"
                    }

                    if(unit.isParalyzed){
                        isParalyzed = "paralyzed";
                    } else {
                        isParalyzed = "notParalyzed";
                    }

                    if(i >= board.length / 2){ team = " team2 "; }
                    else { team = " team1 " }

                    return (
                        <div className={"unit-container " + dead + chosed + possible + team} onClick = {() => {this.props.toggle(unit, i)}} key={i}>
                            <img src={defence} alt="isDefenced" className={isDefenced}/>
                            <img src={paralyze} alt="isParalyzed" className={isParalyzed}/>
                            <img src={unit.logo} alt="" className="unit" />
                            HP: {unit.healthPoint} 
                            <h2>{unit.name}</h2>
                        </div>
                    )
                })}
            </div>
        )
    }
}