import Unit from '../Unit';
import DamagerBehaviour from '../DamageBehaviours/DamagerBehaviour';

export default class Melee extends Unit{
    private _damageCapacity: number;

    constructor(healthPoint: number, initiative: number){
        super(healthPoint, initiative);
        this._damageBehaviour = new DamagerBehaviour();
    }   

    public set damageCapacity(damageCapacity: number){
        damageCapacity >= 0
            ? this._damageCapacity = damageCapacity
            : this._damageCapacity = 0;
    }

    public get damageCapacity(): number{
        return this._damageCapacity;
    }

    public doDamage(enemyHealth: number): number{
        return this._damageBehaviour.doDamage(enemyHealth, this._damageCapacity);
    }
}