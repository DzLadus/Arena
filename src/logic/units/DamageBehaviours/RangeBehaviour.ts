import IDamageBehaviour from './IDamageBehaviour';

export default class RangeBehaviour implements IDamageBehaviour{
    damageCapacity: number;

    doDamage(enemyHealth: number): number{
        return enemyHealth - this.damageCapacity > 0 
                ? enemyHealth - this.damageCapacity
                : 0;
    }
}