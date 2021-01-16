export const initialState = {
    user: null,
    cohorts: [],
    blogs: [],
    titleFilter: "",
    tagFilter: "",
    cohortFilter: "",
    selectedCohort: null
}

const reducer = (state,action) => {
    switch(action.type){
        case "SET_USER":
            // console.log('hello', action)
            return {
                ...state,
                user: action.user,
                // blogs: action.user ? action.blogs : []
                // blogs: action.blogs
            }
        case "SET_INITIAL_DATA":
            return {
                ...state,
                cohorts: action.cohorts,
                blogs: action.blogs
            }
        case "SELECT_COHORT": 
            return {
                ...state,
                selectedCohort: action.selectedCohort
            }
        // case "SET_COHORTS":
        //     return {
        //         ...state,
        //         cohorts: action.cohorts
        //     }
        // case "SET_BLOGS":
        //     return {
        //         ...state,
        //         blogs: action.blogs
        //     }
        // case "SET_USER_BLOGS":
        //     return {
        //         ...state,
        //         userBlogs: action.userBlogs
        //     }
        case "ADD_BLOG":
            return {
                ...state,
                blogs: [...state.blogs, action.blog]
            }
        case "DELETE_BLOG":
            const removedUserBlog = state.blogs.filter(userBlog => userBlog._id !== action.id)
            return {
                ...state,
                blogs: removedUserBlog
            }
        case "SET_TITLE_FILTER":
            return {
                ...state,
                titleFilter: action.input
            }
        case "SET_TAG_FILTER":
            return {
                ...state,
                tagFilter: action.input
            }
        case "SET_COHORT_FILTER":
            return {
                ...state,
                cohortFilter: action.input
            }
        default: 
            return state
    }
}

export default reducer;