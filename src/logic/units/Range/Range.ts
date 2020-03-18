import Unit from '../Unit';
import IDamageBehaviour from '../DamageBehaviours/IDamageBehaviour';
import DamagerBehaviour from '../DamageBehaviours/DamagerBehaviour';
import ITargetBehaviour from '../TargetsBehaviours/ITargetsBehaviour';
import RangeTargetBehaviour from '../TargetsBehaviours/RangeTargetBehaviour';
import { RANGE } from '../DamageBehaviours/DamageTypes';

export default class Range extends Unit{
    private _damageCapacity: number;
    private _damageBehaviour: IDamageBehaviour;
    private _targetBehaviour: ITargetBehaviour;

    constructor(healthPoint: number, initiative: number, damageCapacity: number, logo: any, name: string, boardPos: number){
        super(healthPoint, initiative, RANGE, logo, name, boardPos);
        this._damageCapacity = damageCapacity;
        this._damageBehaviour = new DamagerBehaviour();
        this._targetBehaviour = new RangeTargetBehaviour();
    }   

    public set damageCapacity(damageCapacity: number){
        damageCapacity >= 0
            ? this._damageCapacity = damageCapacity
            : this._damageCapacity = 0;
    }

    public get damageCapacity(): number{
        return this._damageCapacity;
    }

    public doDamage(enemyHealth: number, isDefenced: boolean): number{
        return this._damageBehaviour.doDamage(enemyHealth, this._damageCapacity, isDefenced);
    }

    public getPossibleTargets(pos: number, board: Unit[]): boolean[]{
        return this._targetBehaviour.getPossibleTargets(pos, board);
    }
}