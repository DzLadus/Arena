import Unit from '../Unit';
import IDamageBehaviour from '../DamageBehaviours/IDamageBehaviour';
import DamagerBehaviour from '../DamageBehaviours/DamagerBehaviour';
import { MAGE } from '../DamageBehaviours/DamageTypes';

export default class Mage extends Unit{
    private _damageCapacity: number;
    private _damageBehaviour: IDamageBehaviour;

    constructor(healthPoint: number, initiative: number, damageCapacity: number, logo: any, name: string){
        super(healthPoint, initiative, MAGE, logo, name);
        this._damageCapacity = damageCapacity;
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