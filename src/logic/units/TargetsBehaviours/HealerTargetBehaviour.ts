import ITargetsBehaviour from '../TargetsBehaviours/ITargetsBehaviour';
import Unit from '../Unit';
import * as DamageType from '../DamageBehaviours/DamageTypes';

export default class HealerTargetBehaviour implements ITargetsBehaviour{
    getPossibleTargets(pos: number, board: Unit[]): boolean[]{
        const unitTeam = pos < board.length / 2 ? 2 : 1;
        let possibleTargets: boolean[] = new Array(board.length);
        possibleTargets.fill(false);

        if(unitTeam === 1){
            const firstUnitPos = board.length / 2;
            return possibleTargets.map((elem, i) => {
                if(board[i].damageType !== DamageType.DEAD){
                    if(i < firstUnitPos)
                        return false;
                    else
                        return true;
                }
                else    
                    return false;
            })
        } else if(unitTeam === 2){
            const lastUnitPos = board.length / 2;
            return possibleTargets.map((elem, i) => {
                if(board[i].damageType !== DamageType.DEAD){
                    if(i < lastUnitPos)
                        return true;
                    else
                        return false;
                }
                else    
                    return false;
            })
        } else {
            return [];
        }
    }
}