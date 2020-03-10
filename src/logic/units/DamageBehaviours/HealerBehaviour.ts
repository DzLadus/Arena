import IDamageBehaviour from './IDamageBehaviour';

export default class HealerBehaviour implements IDamageBehaviour{
    doDamage(mateHealth: number, capacity: number): number{
        return mateHealth + capacity;
    }
}