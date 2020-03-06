import IDamageBehaviour from './DamageBehaviours/IDamageBehaviour';

export default class Unit{
    private _healthPoint: number;
    private _initiative: number;
    protected _damageBehaviour: IDamageBehaviour;

    constructor(healthPoint: number, initiative: number){
        this.healthPoint = healthPoint;
        this.initiative = initiative;
    }

    public set healthPoint(healthPoint: number){
        if(healthPoint >= 0)
            this._healthPoint = healthPoint;
        else 
            this._healthPoint = 0;
    }

    public get healthPoint(): number{
        return this._healthPoint;
    }

    public set initiative(initiative: number){
        if(initiative >= 0)
            this._initiative = initiative;
        else 
            this._initiative = 0;
    }

    public get initiative(): number{
        return this._initiative;
    }
}