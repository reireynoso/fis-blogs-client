export const initialState = {
    user: null,
    cohorts: [],
    blogs: []
}

const reducer = (state,action) => {
    switch(action.type){
        case "SET_USER":
            // console.log('hello', action)
            return {
                ...state,
                user: action.user,
                // blogs: action.user ? action.blogs : []
                blogs: action.blogs
            }
        case "SET_COHORTS":
            return {
                ...state,
                cohorts: action.cohorts
            }
        // case "SET_USER_BLOGS":
        //     return {
        //         ...state,
        //         userBlogs: action.userBlogs
        //     }
        case "DELETE_BLOG":
            const removedUserBlog = state.blogs.filter(userBlog => userBlog._id !== action.id)
            return {
                ...state,
                blogs: removedUserBlog
            }
        default: 
            return state
    }
}

export default reducer;