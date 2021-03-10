import {BlogLinkedList} from '../helpers/blogs-ds';
import { CohortLinkedList } from '../helpers/cohort-ds';

export const initialState = {
    theme: "light",
    user: null,
    cohortLL: null,
    cohorts: [],
    blogLL: null,
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
        case "SET_THEME":
            localStorage.setItem("muiTheme", action.theme)
            return {
                ...state,
                theme: action.theme
            }
        case "SET_USER":
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
            const blogLinkedList = new BlogLinkedList();
            const blogs = blogLinkedList.convertArrayToLinkedList(action.blogs);
            const cohortLinkedList = new CohortLinkedList();
            const cohorts = cohortLinkedList.convertArrayToLinkedList(action.cohorts);

            return {
                ...state,
                cohorts,
                cohortLL: cohortLinkedList,
                blogs,
                blogLL: blogLinkedList
            }
        case "SELECT_COHORT": 
            return {
                ...state,
                selectedCohort: action.selectedCohort,
            }
        case "UPDATE_USER":
            const updateUsers = state.users.map(user => {
                if(user._id === action.userId){
                    return {
                        ...user,
                        admin: !user.admin
                    }
                }
                return user
            })
            return {
                ...state,
                users: updateUsers
            }
        case "CHANGE_COHORTS":
            return {
                ...state,
                cohorts: action.cohorts
            }

        case "REMOVE_USER_ADMIN": 
            return {
                ...state,
                cohorts: action.userId
            }
        case "ADD_USER_ADMIN_COHORT":
            return {
                ...state,
                cohorts: action.cohorts,
                adminUpdateModal: false
            }
        case "EDIT_COHORT_NAME":
            return {
                ...state,
                cohorts: action.cohorts
            }


        case "ADD_COHORT":
            return {
                ...state,
                cohorts: action.cohort
            }
        case "CHANGE_BLOG":
            return {
                ...state,
                blogs: action.blogs
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
        default: 
            return state
    }
}

export default reducer;