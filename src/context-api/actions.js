// user actions
export const setUser = (user) => ({
    type: "SET_USER",
    user
})

// cohort actions

export const setCohorts = (cohorts) => ({
    type: "SET_COHORTS",
    cohorts
})

// blog actions

// export const setUserBlogs = (userBlogs) => ({
//     type: "SET_USER_BLOGS",
//     userBlogs
// })
export const setBlogs = (blogs) => ({
    type: "SET_BLOGS",
    blogs
})

export const deleteBlog = (id) => {
    console.log(id)
    return ({
        type: "DELETE_BLOG",
        id
    })
}