import Melee from '../units/Melee/Melee';
import Healer from '../units/Healer/Healer';
import Range from '../units/Range/Range';
import Mage from '../units/Mage/Mage';
import Paralyzer from '../units/Paralyzer/Paralyzer';
import Unit from '../units/Unit';
import meleeLogo from '../../img/pawn.png';
import healerLogo from '../../img/king.png';
import rangeLogo from '../../img/rook.png';
import mageLogo from '../../img/queen.png';
import paralyzerLogo from '../../img/bishop.png';

export default class Game{
    teamInit(): Unit[][][]{

        let board: Unit[][][] = [];
        let allUnits: Unit[] = [
            new Melee(100, 25, 50, meleeLogo, 'Skeleton'),
            new Melee(150, 50, 50, meleeLogo, 'Centaur'),
            new Healer(70, 40, 20, healerLogo, 'Monk'),
            new Range(90, 40, 60, rangeLogo, 'Elf Archer'),
            new Range(45, 30, 60, rangeLogo, 'Bandit'),
            new Mage(50, 20, 40, mageLogo, 'Skeleton Mage'),
            new Mage(90, 40, 40, mageLogo, 'Archimage'),
            new Paralyzer(80, 20, paralyzerLogo, 'Sirena')
        ];

        for(let i = 0; i < 2; i++){
            let team: Unit[][] = [];
            for(let g = 0; g < 2; g++){
                let row: Unit[] = [];
                for(let k = 0; k < 3; k++){
                    row.push(allUnits[Math.floor(Math.random() * allUnits.length)]);
                }
                team.push(row);
            }
            board.push(team);
        }

        return board;
    }

    act(): void{
        return;
    }

    /*
    gameinitialstate: {
        round: ,
        turn: true/false,
        topteamsumhealth:
        downteamsumhealth:
        chosenUnitIndex:{
            team:,
            row:,
            col:
        },
        allUnits: [],
        actionsRemains:
    }
    */

    logHealth(board: Unit[][]): void{
        board.forEach((elem: Unit[]) => {
            elem.forEach((elem: Unit) => {
                console.log("Unit's health " + elem.healthPoint)
            })
            console.log("");
        })
    }
}