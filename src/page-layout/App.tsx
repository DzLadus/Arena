import * as React from 'react';
import FieldContainer from '../containers/FieldContainer';
import InfoContainer from '../containers/InfoContainer';
import Unit from '../logic/units/Unit';
import Game from '../logic/game/Game';

type MyState = {
    board: Unit[],
    unitInActionPos: number,
    possibleTargets: boolean[],
    priorityQueue: Unit[]
};
type MyProps = {};

export default class App extends React.Component<MyProps, MyState>{

    private game: Game;
    
    constructor(props: MyProps){
        super(props);
        this.game = new Game(4, 3);
        this.state = {
            board: this.game.board,
            unitInActionPos: this.game.newRoundStart(),
            possibleTargets: this.game.getPossibleTargets(this.game.board[this.game.priorityUnitIndex], this.game.priorityUnitIndex),
            priorityQueue: this.game.unitsPriority
        };
    }

    private attackToggle = (unit: Unit, i: number) => {
        if(this.state.possibleTargets[i] !== false){
            this.setState({
                ...this.state,
                board:  this.game.newStep(unit, i),
                unitInActionPos: this.game.priorityUnitIndex,
                possibleTargets: this.game.getPossibleTargets(this.game.board[this.game.priorityUnitIndex], this.game.priorityUnitIndex),
                priorityQueue: this.game.unitsPriority
            });
        }   
    }

    private defenceToggle = () => {
        let newBoard = [...this.state.board];
        newBoard[this.state.unitInActionPos].isDefenced = true;
        this.setState({
            ...this.state,
            board:  this.game.refreshPriorityIndex(newBoard),
            unitInActionPos: this.game.priorityUnitIndex,
            possibleTargets: this.game.getPossibleTargets(this.game.board[this.game.priorityUnitIndex], this.game.priorityUnitIndex),
            priorityQueue: this.game.unitsPriority
        })
        alert(`${this.state.board[this.state.unitInActionPos].name} is defenced!`);
    }

    render(){
        return(
            <div className="page">
                <InfoContainer toggle={this.defenceToggle} priorityQueue={this.state.priorityQueue}/>
                <FieldContainer col={3} row={4} payload={this.state} toggle={this.attackToggle}/>
            </div>
        )
    }
}