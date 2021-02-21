export const truncate = (item, length) => {
    if(!length) return item

    if(item.length > length){
        return item.slice(0, length) + "..."
    }
    return item
}

export const findCohortBlogs = (blogs, cohort) => {
    return blogs.filter(blog => blog.cohort._id === cohort._id && !blog.approved)
}

export const findUserBlogs = (blogs, user) => {
    return blogs.filter(blog => blog.user._id === user._id)
}

const tagMatch = (blog, tag) => {
    return !tag || (tag && blog.tags[tag])
}

const cohortMatch = (blog, cohort) => {
    return !cohort || (cohort && blog.cohort._id === cohort)
}

export const handleFilter = (blogs, title, tag, cohort) => blogs.filter(blog => 
    // blog.title.toLowerCase().includes(title.toLowerCase()) 
    blog.title.toLowerCase().indexOf(title.toLowerCase()) !== -1 
    && blog.approved
    && tagMatch(blog,tag) 
    && cohortMatch(blog,cohort)
)

export const handleUserFilter = (users, searchTerm, route, cohortAdmins, loggedUserId) => {
    if(!users) return null;
    if(route === "/admin/users"){
        if(!searchTerm) return users
        // return users.filter(user =>  user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return users.filter(user =>  user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
    }
    else{
        let filtered = [];
        filtered = users.filter(user => user.admin)
        if(!searchTerm && !cohortAdmins){
            return filtered
        }

        if(!cohortAdmins){
            // filtered = filtered.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            filtered = filtered.filter(user => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        }else{
            filtered = [loggedUserId, ...filtered]
            filtered = filtered.filter(user => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 && !cohortAdmins.some(admin => admin._id === user._id))
        }
        
        return filtered//filtered.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
}

export const handleCohortFilter = (cohorts, filter) => {
    if(!filter) return cohorts 
    return cohorts.filter(cohort => cohort.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
}