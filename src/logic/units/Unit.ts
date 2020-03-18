export default abstract class Unit{

    private _healthPoint: number;
    private _initiative: number;
    private _damageType: string;
    private _name: string;
    private _logo: any;
    private _boardPos: number;
    private _isParalyzed: boolean;
    private _isDefenced: boolean;

    constructor(healthPoint: number, initiative: number, damageType: string, logo:any, name: string, boardPos: number){
        this._healthPoint = healthPoint;
        this._initiative = initiative;
        this._damageType = damageType;
        this._name = name;
        this._logo = logo;
        this._boardPos = boardPos;
        this._isParalyzed = false;
        this._isDefenced = false;
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

    public set boardPos(boardPos: number){
        this._boardPos = boardPos;
    }

    public get boardPos(): number{
        return this._boardPos;
    }

    public set isParalyzed(isParalized: boolean){
        this._isParalyzed = isParalized;
    }

    public get isParalyzed(): boolean{
        return this._isParalyzed;
    }

    public set isDefenced(isDefenced: boolean){
        this._isDefenced = isDefenced;
    }

    public get isDefenced(): boolean{
        return this._isDefenced;
    }

    public abstract doDamage(target?: number, isDefenced?: boolean): number;
    public abstract getPossibleTargets(pos: number, board: Unit[], rowsCount?: number): boolean[];
}