import IDamageBehaviour from './IDamageBehaviour';

export default class DamagerBehaviour implements IDamageBehaviour{
    doDamage(enemyHealth: number, capacity: number, isDefenced: boolean): number{
        if(isDefenced){
            return enemyHealth - Math.floor(capacity / 2) >= 0 
                ? enemyHealth - Math.floor(capacity / 2)
                : 0;
        }
        else {
            return enemyHealth - capacity >= 0 
                ? enemyHealth - capacity
                : 0;
        }
    }
}