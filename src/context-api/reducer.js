export const initialState = {
    user: null,
    cohorts: [],
    blogs: [],
    users: null, // ideally empty array but for useEffect purposes
    titleFilter: "",
    tagFilter: "",
    cohortFilter: "",
    selectedCohort: null,
    notificationOpen: false,
    notificationStatement: "",
    notificationCallbackFunction: null,
    adminUpdateModal: false
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
        case "SET_USERS_ADMIN_VIEW": 
            return {
                ...state,
                users: action.users
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
        case "REMOVE_USER_ADMIN": 
            const removedUser = state.selectedCohort.admins.filter(admin => admin._id !== action.userId)
            const updatedSelectedCohort = {
                ...state.selectedCohort,
                admins: removedUser
            }
            const updatedCohorts = state.cohorts.map(cohort => {
                if(cohort._id === updatedSelectedCohort._id){
                    return updatedSelectedCohort
                }
                return cohort
            })
            return {
                ...state,
                selectedCohort: updatedSelectedCohort,
                cohorts: updatedCohorts
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
        case "APPROVE_BLOG": 
        const updatedBlogs = state.blogs.map(blog => {
            if(blog._id === action.blogId){
                blog.approved = true
            }
            return blog
        })

        return {
            ...state,
            blogs: updatedBlogs
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
        // notification modal
        case "SET_NOTIFICATION_OPEN":
            return {
                ...state,
                notificationOpen: true,
                notificationStatement: action.statement,
                notificationCallbackFunction: action.callback
            }
        case "SET_NOTIFICATION_CLOSE":
            return {
                ...state,
                notificationOpen: false
            }
        case "CLEAR_NOTIFICATION_FIELDS":
            return {
                ...state,
                notificationStatement: "",
                notificationCallbackFunction: null
            }
        // user admin modal
        case "SET_ADMIN_UPDATE":
            return {
                ...state,
                adminUpdateModal: action.status
            }
        // case "SET_ADMIN_UPDATE_CLOSE":
        //     return {
        //         ...state,
        //         adminUpdateModal: false
        //     }
        default: 
            return state
    }
}

export default reducer;