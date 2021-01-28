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

// export const setCohorts = (cohorts) => ({
//     type: "SET_COHORTS",
//     cohorts
// })

// cohort admin actions
export const selectCohort = (selectedCohort) => ({
    type: "SELECT_COHORT",
    selectedCohort
})

// remove user from cohort as an admin
export const removeUserAdmin = (userId) => ({
    type: "REMOVE_USER_ADMIN",
    userId
})

// blog actions

// export const setUserBlogs = (userBlogs) => ({
//     type: "SET_USER_BLOGS",
//     userBlogs
// })
// export const setBlogs = (blogs) => ({
//     type: "SET_BLOGS",
//     blogs
// })

export const addBlog = (blog) => ({
    type: "ADD_BLOG",
    blog
})

export const setInitialData = (blogs, cohorts) => ({
    type: "SET_INITIAL_DATA",
    blogs,
    cohorts
})

export const approveBlog = (blogId) => ({
    type: "APPROVE_BLOG",
    blogId
})

export const deleteBlog = (id) => {
    // console.log(id)
    return ({
        type: "DELETE_BLOG",
        id
    })
}

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
