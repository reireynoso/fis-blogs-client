export const truncate = (item) => {
    if(item.length > 50){
        return item.slice(0, 40) + "..."
    }
    return item
}

// inefficient approach filtering

export const findCohortBlogs = (blogs, cohort) => {
    return blogs.filter(blog => blog.cohort.name === cohort.name && !blog.approved)
}

export const findUserBlogs = (blogs, user) => {
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
    && blog.approved
    && tagMatch(blog,tag) 
    && cohortMatch(blog,cohort)
)

export const handleUserFilter = (users, searchTerm, route, cohortAdmins, loggedUserId) => {
    if(!users) return null;
    if(route === "/admin/users"){
        if(!searchTerm) return users
        return users.filter(user =>  user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    else{
        let filtered = [];
        filtered = users.filter(user => user.admin)
        if(!searchTerm && !cohortAdmins){
            return filtered
        }

        if(!cohortAdmins){
            filtered = filtered.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }else{
            filtered = [loggedUserId, ...filtered]
            filtered = filtered.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) && !cohortAdmins.some(admin => admin._id === user._id))
        }
        
        return filtered//filtered.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
}
    // if(!searchTerm && route === "/admin/users") return users;
    // return users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
