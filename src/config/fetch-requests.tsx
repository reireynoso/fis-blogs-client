import Cookies from 'universal-cookie';
import {server} from '../config/endpoints';
const cookies = new Cookies();
const token : String = cookies.get('token');
// handles new blog request
type informationObjectType = {
    tags: string[],
    link: string,
    cohort: string
}
export const newBlogRequest = (informationObject: informationObjectType) => {
    return fetch(`${server}/blog/new`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application.json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(informationObject)
    })
    .then(res => res.json())
}

// fetch logged in user's blogs from the server

// export const fetchUserBlogs = () => {
//     return fetch(`${server}/blog/me`, {
//         method: "get",
//         headers: {
//             "Accept": "application.json",
//             "Authorization": `Bearer ${token}`
//         },
//     })
//     .then(res => res.json())
// }

// handles fetching cohorts from db
export const fetchCohorts = () => {
    return fetch(`${server}/cohort`)
    .then(res => {
        return res.json()
    })
}

// handle submitting new cohort request
export const newCohortRequest = (name: string) => {
    return fetch(`${server}/cohort/new`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`
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
          'Authorization': `Bearer ${token}`
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