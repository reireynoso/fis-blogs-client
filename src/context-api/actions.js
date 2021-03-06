// user actions
export const setUser = (user) => ({
    type: "SET_USER",
    user
})

export const setAdminUsers = (users) => ({
    type: "SET_USERS_ADMIN_VIEW",
    users
})

export const updateUser = (userId) => ({
    type: "UPDATE_USER",
    userId
})

// cohort actions
// cohort admin actions
export const selectCohort = (selectedCohort) => ({
    type: "SELECT_COHORT",
    selectedCohort
})

// add user as admin to cohort
export const addUserAdminToCohort = (cohorts) => ({
    type: "ADD_USER_ADMIN_COHORT",
    cohorts
})

export const changeCohorts = (cohorts) => ({
    type: "CHANGE_COHORTS",
    cohorts
})
// blog actions

export const changeBlogs = (blogs) => ({
    type: "CHANGE_BLOG",
    blogs
})

export const setInitialData = (blogs, cohorts) => ({
    type: "SET_INITIAL_DATA",
    blogs,
    cohorts
})

//notificaiton actions
export const setNotificationOpen = (statement, callback) => ({
    type: "SET_NOTIFICATION_OPEN",
    statement,
    callback
})

export const setNotificationClose = () => ({
    type: "SET_NOTIFICATION_CLOSE"
})

export const clearNotificationFields = () => ({
    type: "CLEAR_NOTIFICATION_FIELDS"
})

// filter actions
export const setTitleFilter = (input) => ({
    type: "SET_TITLE_FILTER",
    input
})

export const setTagFilter = (input) => ({
    type: "SET_TAG_FILTER",
    input
})

export const setCohortFilter = (input) => ({
    type: "SET_COHORT_FILTER",
    input
})

// admin update modal
export const setAdminUpdate = (status) => ({
    type: "SET_ADMIN_UPDATE",
    status
})
