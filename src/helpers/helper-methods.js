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

const tagMatch = (blog, tag) => {
    return !tag || (tag && blog.tags[tag])
}

export const handleFilter = (blogs, title, tag) => {
    return blogs.filter(blog => 
            {
                return blog.title.toLowerCase().includes(title.toLowerCase()) && tagMatch(blog,tag)
            }
        )
}