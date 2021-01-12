export const truncate = (item) => {
    if(item.length > 50){
        return item.slice(0, 40) + "..."
    }
    return item
}

// inefficient approach filtering

export const findUserBlogs = (blogs, user) => {
    // return blogs
    return blogs.filter(blog => blog.user._id === user._id)
}

const tagMatch = (blog, tag) => {
    return !tag || (tag && blog.tags[tag])
}

const cohortMatch = (blog, cohort) => {
    return !cohort || (cohort && blog.cohort.name === cohort)
}

export const handleFilter = (blogs, title, tag, cohort) => blogs.filter(blog => 
    blog.title.toLowerCase().includes(title.toLowerCase()) 
    && tagMatch(blog,tag) 
    && cohortMatch(blog,cohort)
)