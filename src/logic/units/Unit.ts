export default class Unit{
    private _healthPoint: number;
    private _initiative: number;
    private _damageType: string;
    private _name: string;
    private _logo: any;

    constructor(healthPoint: number, initiative: number, damageType: string, logo:any, name: string){
        this._healthPoint = healthPoint;
        this._initiative = initiative;
        this._damageType = damageType;
        this._name = name;
        this._logo = logo;
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

    public get damageType(): string{
        return this._damageType;
    }

    public get name(): string{
        return this._name;
    }

    public get logo(): any{
        return this._logo;
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