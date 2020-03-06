import Unit from '../Unit';
import HealerBehaviour from '../DamageBehaviours/HealerBehaviour';

export default class Healer extends Unit{
    private _healCapacity: number;

    constructor(healthPoint: number, initiative: number){
        super(healthPoint, initiative);
        this._damageBehaviour = new HealerBehaviour();
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
}