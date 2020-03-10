import Unit from '../Unit';
import IDamageBehaviour from '../DamageBehaviours/IDamageBehaviour';
import ParalyzerBehaviour from '../DamageBehaviours/ParalyzerBehaviour';
import { PARALYZER } from '../DamageBehaviours/DamageTypes';

export default class Paralyzer extends Unit{
    private _damageBehaviour: IDamageBehaviour;

    constructor(healthPoint: number, initiative: number, logo: any, name: string){
        super(healthPoint, initiative, PARALYZER, logo, name);
        this._damageBehaviour = new ParalyzerBehaviour();
    }

    public doDamage(): number{
        return this._damageBehaviour.doDamage();
    }
}