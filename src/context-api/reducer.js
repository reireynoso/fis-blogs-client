export const initialState = {
    user: null,
    cohorts: [],
    userBlogs: []
}

const reducer = (state,action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.user,
                userBlogs: action.user ? action.userBlogs : []
            }
        case "SET_COHORTS":
            return {
                ...state,
                cohorts: action.cohorts
            }
        case "SET_USER_BLOGS":
            return {
                ...state,
                userBlogs: action.userBlogs
            }
        default: 
            return state
    }
}

export default reducer;