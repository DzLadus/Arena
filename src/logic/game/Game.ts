import Melee from '../units/Melee/Melee';
import Healer from '../units/Healer/Healer';
import Range from '../units/Range/Range';
import Mage from '../units/Mage/Mage';
import Paralyzer from '../units/Paralyzer/Paralyzer';
import Dead from '../units/Dead/Dead';
import Unit from '../units/Unit';
import meleeLogo1 from '../../img/wr-king.png';
import meleeLogo2 from '../../img/cn-war.png';
import healerLogo from '../../img/dazz.png';
import rangeLogo1 from '../../img/trax.png';
import rangeLogo2 from '../../img/bh.png';
import mageLogo1 from '../../img/warlock.png';
import mageLogo2 from '../../img/zeus.png';
import paralyzerLogo from '../../img/siren.png';
import deadLogo from '../../img/dead.png';
import * as DamageTypes from '../units/DamageBehaviours/DamageTypes';

export default class Game{

    private _board: Unit[];
    private _unitsPriority: Unit[];
    private _priorityUnitIndex: number;

    private _row: number;
    private _col: number;

    constructor(row: number, col: number) {
        this._row = row;
        this._col = col;
        this._unitsPriority = [];
        this._priorityUnitIndex = -1;
        this._board = this.unitsBoardFactory(this._row * this._col);
    }

    public newRoundStart(): number{
        this._board.forEach((unit: Unit) => {
            unit.isParalyzed = false;
        })
        this._unitsPriority = this.unitsPriorityFactory([...this._board]);
        this._priorityUnitIndex = this._board.indexOf(this._unitsPriority[this._unitsPriority.length - 1]);
        return this._priorityUnitIndex;
    }

    public getPossibleTargets(unit: Unit, pos: number): boolean[]{
        return unit.getPossibleTargets(pos, [...this._board], this._row);
    }


    public newStep(chosedUnit: Unit, unitPos: number): Unit[]{
        if(chosedUnit.damageType === DamageTypes.DEAD){
            return this._board;
        }

        switch(this._board[this._priorityUnitIndex].damageType){
            case DamageTypes.HEALER: {
                chosedUnit.healthPoint = (this._board[this._priorityUnitIndex] as Healer).doDamage(chosedUnit.healthPoint);
                this._board[unitPos] = chosedUnit;
                break;
            }
            case DamageTypes.MELEE: {

                chosedUnit.healthPoint = (this._board[this._priorityUnitIndex] as Melee).doDamage(chosedUnit.healthPoint, chosedUnit.isDefenced);
                if(chosedUnit.healthPoint === 0){
                    this._board[unitPos] = new Dead(deadLogo, unitPos);
                    this._unitsPriority = this._unitsPriority.filter((unit: Unit) => { return unit.boardPos !== unitPos });
                }
                else
                    this._board[unitPos] = chosedUnit;
                break;
            }
            case DamageTypes.RANGE: {
                chosedUnit.healthPoint = (this._board[this._priorityUnitIndex] as Range).doDamage(chosedUnit.healthPoint, chosedUnit.isDefenced);
                if(chosedUnit.healthPoint === 0){
                    this._board[unitPos] = new Dead(deadLogo, unitPos);
                    this._unitsPriority = this._unitsPriority.filter((unit: Unit) => { return unit.boardPos !== unitPos });
                }
                else
                    this._board[unitPos] = chosedUnit;
                break;
            }
            case DamageTypes.MAGE: {
                let unitTeam = 0;
                this._priorityUnitIndex > this.board.length / 2
                    ? unitTeam = 1
                    : unitTeam = 2;
                const middBoard: number = this.board.length / 2;

                if(unitTeam === 1){
                    for(let i = 0; i < middBoard; i++){
                        this._board[i].healthPoint = (this._board[this._priorityUnitIndex] as Mage).doDamage(this._board[i].healthPoint, this._board[i].isDefenced);
                        if(this._board[i].healthPoint === 0){
                            this._board[i] = new Dead(deadLogo, i);
                            this._unitsPriority = this._unitsPriority.filter((unit: Unit) => { return unit.boardPos !== i });
                        }
                    }
                } else {
                    for(let i = middBoard; i < this.board.length; i++){
                        this._board[i].healthPoint = (this._board[this._priorityUnitIndex] as Mage).doDamage(this._board[i].healthPoint, this._board[i].isDefenced);
                        if(this._board[i].healthPoint === 0){
                            this._board[i] = new Dead(deadLogo, i);
                            this._unitsPriority = this._unitsPriority.filter((unit: Unit) => { return unit.boardPos !== i });
                        }
                    }
                }
                break;
            }
            case DamageTypes.PARALYZER: {
                chosedUnit.isParalyzed = true;
                this._unitsPriority = this._unitsPriority.filter((unit: Unit) => { return unit.isParalyzed !== true; });
            }
        }    

        this._board[unitPos].isDefenced = false;

        if(this.isTeamWin([...this._board])) {
            alert(`The team number ${this.isTeamWin([...this._board])} has won!`); 
            this.startNewGame(); 
            return this.board
        }

        this._unitsPriority.pop();

        if(this._unitsPriority.length === 0) { 
            alert('new round started!'); 
            this.newRoundStart(); 
            return this._board; 
        }

        this._priorityUnitIndex = this._board.indexOf(this._unitsPriority[this._unitsPriority.length - 1]);
        return this._board;
    }

    public get board(): Unit[]{
        return this._board;
    }

    public get priorityUnitIndex(): number{
        return this._priorityUnitIndex;
    }

    public get unitsPriority(): Unit[]{
        return this._unitsPriority;
    }

    public refreshPriorityIndex(board: Unit[]): Unit[]{
        this._unitsPriority.pop();

        if(this._unitsPriority.length === 0) { 
            alert('new round started!'); 
            this.newRoundStart(); 
            return this._board; 
        }

        this._priorityUnitIndex = board.indexOf(this._unitsPriority[this._unitsPriority.length - 1]);
        return board;
    }

    private unitsPriorityFactory(board: Unit[]): Unit[]{
        let unitsPriorityQueue = board;
        unitsPriorityQueue.sort( (a: Unit, b: Unit) => { return (a.initiative - b.initiative) } );
        unitsPriorityQueue = unitsPriorityQueue.filter( (unit: Unit) => { return (unit.damageType !== DamageTypes.DEAD && unit.isParalyzed !== true) } );
        return unitsPriorityQueue;
    }

    private startNewGame(): void{
        this._unitsPriority = [];
        this._priorityUnitIndex = -1;
        this._board = this.unitsBoardFactory(this._row * this._col);
        this.newRoundStart();
        return;
    }

    private isTeamWin(board: Unit[]): number{
        if(this.isFirstTeamWin(board)) 
            return 1;
        else if(this.isSecondTeamWin(board))
            return 2;
        else 
            return 0;
    }

    private isFirstTeamWin(board: Unit[]): boolean{
        const midUnitNumber = board.length / 2;

        for(let i = 0; i < midUnitNumber; i++){
            if(board[i].damageType !== DamageTypes.DEAD) 
                return false;
        }
        
        return true;
    }

    private isSecondTeamWin(board: Unit[]): boolean{
        const midUnitNumber = board.length / 2;

        for(let i = midUnitNumber; i < board.length; i++){
            if(board[i].damageType !== DamageTypes.DEAD) 
                return false;
        }
        
        return true;
    }

    private unitsBoardFactory(unitsCount: number): Unit[]{
        let board: Unit[] = [];

        let allUnits: string[] = [
            'Skeleton',
            'Centaur', 
            'Monk',
            'Elf Archer',
            'Bandit',
            'Skeleton Mage',
            'Archimage',
            'Sirena'
        ];

        for(let i = 0; i < unitsCount; i++){
            switch(allUnits[Math.floor(Math.random() * allUnits.length)]){
                case 'Skeleton': { board.push( new Melee(100, 50, 25, meleeLogo1, 'Skeleton', i) ); break; }
                case 'Centaur': { board.push( new Melee(150, 50, 50, meleeLogo2, 'Centaur', i) ); break; }
                case 'Monk': { board.push( new Healer(70, 20, 40, healerLogo, 'Monk', i) ); break; }
                case 'Elf Archer': { board.push( new Range(90, 60, 40, rangeLogo1, 'Elf Archer', i) ); break; }
                case 'Bandit': { board.push( new Range(45, 60, 30, rangeLogo2, 'Bandit', i) ); break; }
                case 'Skeleton Mage': { board.push( new Mage(50, 40, 20, mageLogo1, 'Skeleton Mage', i) ); break; }
                case 'Archimage': { board.push( new Mage(90, 40, 40, mageLogo2, 'Archimage', i) ); break; }
                case 'Sirena': { board.push( new Paralyzer(80, 20, paralyzerLogo, 'Sirena', i) ); break; }
            }
        }

        return board;
    }
}