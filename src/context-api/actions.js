// user actions
export const setUser = (user, userBlogs) => ({
    type: "SET_USER",
    user,
    userBlogs
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

export const deleteUserBlog = (id) => {
    console.log(id)
    return ({
        type: "DELETE_USER_BLOG",
        id
    })
}