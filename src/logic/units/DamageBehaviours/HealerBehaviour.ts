import IDamageBehaviour from './IDamageBehaviour';

export default class HealerBehaviour implements IDamageBehaviour{
    damageCapacity: number;
    
    doDamage(mateHelp: number): number{
        return mateHelp + this.damageCapacity;
    }
}