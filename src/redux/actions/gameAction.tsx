export const GAME_START = 'GAME_START';
export const GAME_END = 'GAME_END';
export const UNIT_IS_CHOSEN = 'UNIT_IS_CHOSEN';


export const gameStart = () => {
    return {
        type: GAME_START,
        payload: {}
    }
}

export const gameEnd = () => {
    return {
        type: GAME_END,
        payload: {}
    }
}

export const unitIsChosen = () => {
    return {
        type: UNIT_IS_CHOSEN,
        payload: {}
    }
}