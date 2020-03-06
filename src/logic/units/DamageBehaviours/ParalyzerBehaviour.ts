import IDamageBehaviour from './IDamageBehaviour';

export default class ParalyzerBehaviour implements IDamageBehaviour{
    doDamage(): number{
        return -1;
    }
}