import Unit from '../Unit';
import IDamageBehaviour from '../DamageBehaviours/IDamageBehaviour';
import HealerBehaviour from '../DamageBehaviours/HealerBehaviour';
import { HEALER } from '../DamageBehaviours/DamageTypes';

export default class Healer extends Unit{
    private _healCapacity: number;
    private _damageBehaviour: IDamageBehaviour;

    constructor(healthPoint: number, initiative: number, healCapacity: number, logo: any, name: string){
        super(healthPoint, initiative, HEALER, logo, name);
        this._healCapacity = healCapacity; 
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