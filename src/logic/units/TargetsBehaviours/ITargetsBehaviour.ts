import Unit from '../Unit';

export default interface ITargetsBehaviour{
    getPossibleTargets(pos: number, board: Unit[], rowsCount?: number): boolean[];
}