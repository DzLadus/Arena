import React from 'react';
import Unit from '../logic/units/Unit';
import Game from '../logic/game/Game';


export default class Field extends React.Component{
    render(){

        const game: Game = new Game();
        const board: Unit[][][] = game.teamInit();
        console.log(board);

        return(

            <div className="field-container">
                {board.map(team => {
                    return team.map(row => {
                        return row.map(unit => {
                            return (
                            <div className="unit-container">
                                <img src={unit.logo} alt="" className="unit" />
                                {unit.healthPoint} - {unit.damageType}
                                <h2>{unit.name}</h2>
                            </div>
                            )
                        })
                    })
                })}
            </div>
        )
    }
}