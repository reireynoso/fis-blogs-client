export const truncate = (item) => {
    if(item.length > 50){
        return item.slice(0, 40) + "..."
    }
    return item
}

export const findUserBlogs = (blogs, user) => {
    // inefficient approach
    // return blogs
    return blogs.filter(blog => blog.user._id === user._id)
}