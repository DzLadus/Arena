export default interface IDamageBehaviour{
    damageCapacity?: number;

    doDamage(target?: number): number;
}