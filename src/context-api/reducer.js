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
        case "DELETE_USER_BLOG":
            const removedUserBlog = state.userBlogs.filter(userBlog => userBlog._id !== action.id)
            return {
                ...state,
                userBlogs: removedUserBlog
            }
        default: 
            return state
    }
}

export default reducer;