import Cookies from 'universal-cookie';
import {server} from '../config/endpoints';
const cookies = new Cookies();

// handles new blog request
type informationObjectType = {
    tags: string[],
    link: string,
    cohort: string
}

// fix to address closure issue when pulling out the token when logging in
function checkToken():string{
    return cookies.get('token')
}

export const newBlogRequest = (informationObject: informationObjectType) => {
    return fetch(`${server}/blog/new`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application.json",
            "Authorization": `Bearer ${checkToken()}`
        },
        body: JSON.stringify(informationObject)
    })
    .then(res => res.json())
}

export const deleteBlogRequest = (selectedBlogId:string) => {
    return fetch(`${server}/blog/delete/${selectedBlogId}`, {
        method: "POST",
        headers: {
            "Accept": "application.json",
            "Authorization": `Bearer ${checkToken()}`
        }
      })
      .then(res => res.json())
} 

export const approveBlogRequest = (selectedBlogId:string) => {
    return fetch(`${server}/blog/approve/${selectedBlogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${checkToken()}`
        }
      })
}

// export const fetchBlogs = () => {
//     return fetch(`${server}/blog/all`)
//     .then(res => res.json())
// }

// fetches cohort and blogs
export const fetchInitialData = () => {
    return fetch(`${server}/initial-data`)
    .then(res => res.json())
}

// fetch logged in user's blogs from the server

// export const fetchUserBlogs = () => {
//     return fetch(`${server}/blog/me`, {
//         method: "get",
//         headers: {
//             "Accept": "application.json",
//             "Authorization": `Bearer ${checkToken(token)}`
//         },
//     })
//     .then(res => res.json())
// }

// handles fetching cohorts from db
// export const fetchCohorts = () => {
//     return fetch(`${server}/cohort`)
//     .then(res => {
//         return res.json()
//     })
// }

// handle submitting new cohort request
export const newCohortRequest = (name: string) => {
    return fetch(`${server}/cohort/new`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json",
            'Authorization': `Bearer ${checkToken()}`
        },
        body: JSON.stringify({
            name
        })
    })
    .then(res => res.json())
}

// handle auto login request

export const handleAutoLogin = () => {
    return fetch(`${server}/auto_login`, {
        // method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json",
          'Authorization': `Bearer ${checkToken()}`
        },
      })
      .then(res => {
        // if the res status is 401, user with token doesn't exist in DB. Address to avoid possible errors
        if(res.status === 401){
          cookies.remove("token", {
              path: "/"
          });
        }
        return res.json()
      })
}

// handle login request

export const handleLogin = (code:string) => {
    return fetch(`${server}/user/login`, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            },
            body: JSON.stringify({
                code: code
            })
        })
        .then(res => {
            return res.json()
        })
}

export const updateUserAdminStatus = (userId:string) => {
    return fetch(`${server}/user/${userId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${checkToken()}`
        }
    })
}

// fetch all users for admin view

export const handleFetchUsers = () => {
    return fetch(`${server}/users/all`, {
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${checkToken()}`
        }
    })
}

// cohort update request

export const updateCohortAdminRequest = (action:string, userId:string, selectedCohortId:string) => {
    return fetch(`${server}/cohort/${selectedCohortId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${checkToken()}`
        },
        body: JSON.stringify({
            action,
            userId
        })
    })
}

export const updateCohortName = (name:string, selectedCohortId:string) => {
    return fetch(`${server}/cohort/${selectedCohortId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': `Bearer ${checkToken()}`
        },
        body: JSON.stringify({
            name
        })
    })
}

