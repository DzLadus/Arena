import IDamageBehaviour from './IDamageBehaviour';

export default class DamagerBehaviour implements IDamageBehaviour{
    doDamage(enemyHealth: number, capacity: number): number{
        return enemyHealth - capacity >= 0 
                ? enemyHealth - capacity
                : 0;
    }
}