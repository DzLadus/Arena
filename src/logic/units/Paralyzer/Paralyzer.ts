import Unit from '../Unit';
import ParalyzerBehaviour from '../DamageBehaviours/ParalyzerBehaviour';

export default class Paralyzer extends Unit{
    constructor(healthPoint: number, initiative: number){
        super(healthPoint, initiative);
        this._damageBehaviour = new ParalyzerBehaviour();
    }

    public doDamage(mateHealth: number): number{
        return this._damageBehaviour.doDamage();
    }
}