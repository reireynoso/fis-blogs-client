// user actions
export const setUser = (user) => ({
    type: "SET_USER",
    user
})

// cohort actions

// export const setCohorts = (cohorts) => ({
//     type: "SET_COHORTS",
//     cohorts
// })

// blog actions

// export const setUserBlogs = (userBlogs) => ({
//     type: "SET_USER_BLOGS",
//     userBlogs
// })
// export const setBlogs = (blogs) => ({
//     type: "SET_BLOGS",
//     blogs
// })

export const setInitialData = (blogs, cohorts) => ({
    type: "SET_INITIAL_DATA",
    blogs,
    cohorts
})

export const deleteBlog = (id) => {
    console.log(id)
    return ({
        type: "DELETE_BLOG",
        id
    })
}

// filter actions
export const setTitleFilter = (input) => ({
    type: "SET_TITLE_FILTER",
    input
})

export const setTagFilter = (input) => ({
    type: "SET_TAG_FILTER",
    input
})