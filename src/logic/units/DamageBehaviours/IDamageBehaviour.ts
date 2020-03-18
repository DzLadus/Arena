export default interface IDamageBehaviour{
    doDamage(target?: number, capacity?: number, isDefenced?: boolean): number;
}