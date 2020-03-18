import Unit from '../Unit';
import IDamageBehaviour from '../DamageBehaviours/IDamageBehaviour';
import HealerBehaviour from '../DamageBehaviours/HealerBehaviour';
import ITargetBehaviour from '../TargetsBehaviours/ITargetsBehaviour';
import HealerTargetBehaviour from '../TargetsBehaviours/HealerTargetBehaviour';
import { HEALER } from '../DamageBehaviours/DamageTypes';

export default class Healer extends Unit{
    private _healCapacity: number;
    private _damageBehaviour: IDamageBehaviour;
    private _targetBehaviour: ITargetBehaviour;

    constructor(healthPoint: number, initiative: number, healCapacity: number, logo: any, name: string, boardPos: number){
        super(healthPoint, initiative, HEALER, logo, name, boardPos);
        this._healCapacity = healCapacity; 
        this._damageBehaviour = new HealerBehaviour();
        this._targetBehaviour = new HealerTargetBehaviour();
    }

    public set healCapacity(healCapacity: number){
        healCapacity >= 0
            ? this._healCapacity = healCapacity
            : this._healCapacity = 0;
    }

    public get healCapacity(): number{
        return this._healCapacity;
    }

    public doDamage(mateHealth: number): number{
        return this._damageBehaviour.doDamage(mateHealth, this._healCapacity);
    }

    public getPossibleTargets(pos: number, board: Unit[]): boolean[]{
        return this._targetBehaviour.getPossibleTargets(pos, board);
    }
}