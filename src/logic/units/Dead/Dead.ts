import Unit from '../Unit';
import { DEAD } from '../DamageBehaviours/DamageTypes';

export default class Dead extends Unit{

    constructor(logo: any, boardPos: number){
        super(0, 0, DEAD, logo, 'Dead', boardPos);
    }

    public doDamage(target?: number): number{return 0;}
    public getPossibleTargets(pos: number, board: Unit[]): boolean[]{return[];}
}