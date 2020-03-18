import Unit from '../Unit';
import IDamageBehaviour from '../DamageBehaviours/IDamageBehaviour';
import ParalyzerBehaviour from '../DamageBehaviours/ParalyzerBehaviour';
import ITargetBehaviour from '../TargetsBehaviours/ITargetsBehaviour';
import ParalyzerTargetBehaviour from '../TargetsBehaviours/ParalyzerTargetBehaviour';
import { PARALYZER } from '../DamageBehaviours/DamageTypes';

export default class Paralyzer extends Unit{
    private _damageBehaviour: IDamageBehaviour;
    private _targetBehaviour: ITargetBehaviour;

    constructor(healthPoint: number, initiative: number, logo: any, name: string, boardPos: number){
        super(healthPoint, initiative, PARALYZER, logo, name, boardPos);
        this._damageBehaviour = new ParalyzerBehaviour();
        this._targetBehaviour = new ParalyzerTargetBehaviour();
    }

    public doDamage(): number{
        return this._damageBehaviour.doDamage();
    }

    public getPossibleTargets(pos: number, board: Unit[]): boolean[]{
        return this._targetBehaviour.getPossibleTargets(pos, board);
    }
}