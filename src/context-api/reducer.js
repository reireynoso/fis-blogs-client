export const initialState = {
    user: null,
    cohorts: []
}

const reducer = (state,action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SET_COHORTS":
            return {
                ...state,
                cohorts: action.cohorts
            }
        default: 
            return state
    }
}

export default reducer;